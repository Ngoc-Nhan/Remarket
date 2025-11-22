import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePostById, useUpdatePostById } from '@/services/query/post';
import { useGetCategories } from '@/services/query/category';
import { uploadFileToCloudinary } from '@/services/api/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Camera, Info } from 'lucide-react';
import { AddressDialog } from '@/components/dialog/AddressDialog';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const UpdatePost = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: post, isLoading: isPostLoading } = usePostById(id || '');
	const { mutate: updatePost, isPending: isUpdating } = useUpdatePostById();
	const { data: categoriesData, isLoading: isCategoriesLoading } = useGetCategories({
		page: 1,
		limit: 100,
	});
	const categories: Category[] =
		categoriesData && 'data' in categoriesData && categoriesData.success
			? categoriesData.data
			: [];

	const [selectedImages, setSelectedImages] = useState<File[]>([]);
	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [age, setAge] = useState('');
	const [size, setSize] = useState('');
	const [category, setCategory] = useState<string>('');
	const [isUploading, setIsUploading] = useState(false);
	const [address, setAddress] = useState<{
		province: string;
		provinceLabel: string;
		ward: string;
		wardLabel: string;
		specificAddress: string;
	} | null>(null);
	const [showAddressDialog, setShowAddressDialog] = useState(false);
	const [errors, setErrors] = useState<{
		title?: string;
		description?: string;
		age?: string;
		size?: string;
		price?: string;
		address?: string;
		category?: string;
		images?: string;
	}>({});

	useEffect(() => {
		if (post) {
			setTitle(post.title || '');
			setDescription(post.description || '');
			setPrice(post.price ? String(post.price) : '');
			setAge(post.age || '');
			setSize(post.size || '');
			setCategory(post.categoryId || '');
			setPreviewUrls(post.postImages?.map((img) => img.url) || []);
			// Parse address nếu có
			if (post.address) {
				const parts = post.address.split(',').map((s) => s.trim());
				setAddress({
					specificAddress: parts[0] || '',
					wardLabel: parts[1] || '',
					provinceLabel: parts[2] || '',
					province: '',
					ward: '',
				});
			}
		}
	}, [post]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			let fileArr = Array.from(files);
			const allImages = [
				...previewUrls,
				...fileArr.map((f) => URL.createObjectURL(f)),
			].slice(0, 6);
			setPreviewUrls(allImages);
			setSelectedImages((prev) => [...prev, ...fileArr].slice(0, 6 - previewUrls.length));
			if (fileInputRef.current) fileInputRef.current.value = '';
		}
	};

	const handleRemoveImage = (idx: number) => {
		setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
		setSelectedImages((prev) =>
			prev.filter((_, i) => i !== idx - (previewUrls.length - prev.length)),
		);
	};

	// Drag & drop reorder
	const dragItem = useRef<number | null>(null);
	const dragOverItem = useRef<number | null>(null);
	const handleDragStart = (idx: number) => {
		dragItem.current = idx;
	};
	const handleDragEnter = (idx: number) => {
		dragOverItem.current = idx;
	};
	const handleDragEnd = () => {
		const from = dragItem.current;
		const to = dragOverItem.current;
		if (from === null || to === null || from === to) return;
		const newFiles = [...previewUrls];
		const [file] = newFiles.splice(from, 1);
		newFiles.splice(to, 0, file);
		setPreviewUrls(newFiles);
		dragItem.current = null;
		dragOverItem.current = null;
	};

	const validateForm = () => {
		const newErrors: typeof errors = {};
		if (!title.trim()) newErrors.title = 'Vui lòng điền tiêu đề';
		const wordCount = description.trim().split(/\s+/).length;
		if (!description.trim() || wordCount < 10)
			newErrors.description = 'Vui lòng nhập ít nhất 10 từ';
		if (!category) newErrors.category = 'Vui lòng chọn danh mục';
		if (!age) newErrors.age = 'Vui lòng chọn độ tuổi';
		if (!size) newErrors.size = 'Vui lòng chọn kích cỡ';
		if (!price.trim() || isNaN(Number(price)))
			newErrors.price = 'Vui lòng nhập giá bán hợp lệ';
		if (!address || !address.provinceLabel || !address.wardLabel)
			newErrors.address = 'Vui lòng chọn đầy đủ địa chỉ';
		if (previewUrls.length === 0) newErrors.images = 'Bạn cần đăng ít nhất 1 ảnh';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!id) return;
		if (validateForm()) {
			let uploadedImageUrls: string[] = [];
			const oldImages = post?.postImages || [];
			const oldImageUrls = oldImages.map((img) => img.url);
			const keepUrls = previewUrls.filter((url) => oldImageUrls.includes(url));
			const newFiles = selectedImages.filter(
				(file) => !keepUrls.includes(URL.createObjectURL(file)),
			);
			if (newFiles.length > 0) {
				setIsUploading(true);
				const uploadPromises = newFiles.map((file) =>
					uploadFileToCloudinary(file, 'image'),
				);
				const results = await Promise.all(uploadPromises);
				for (const res of results) {
					if (res.success && res.data && res.data.secure_url) {
						uploadedImageUrls.push(res.data.secure_url);
					} else {
						setIsUploading(false);
						setErrors((prev) => ({
							...prev,
							images: 'Có ảnh không upload được, hãy thử lại.',
						}));
						return;
					}
				}
				setIsUploading(false);
			}
			const deletePostImageIds = oldImages
				.filter((img) => !previewUrls.includes(img.url))
				.map((img) => img.id);
			const newPostImages = uploadedImageUrls.map((url) => ({ url }));
			const payload = {
				title,
				description,
				price: Number(price),
				age: age as PetAge,
				size: size as PetSize,
				address: address
					? `${address.specificAddress}, ${address.wardLabel}, ${address.provinceLabel}`
					: '',
				categoryId: category,
				newPostImages,
				deletePostImageIds,
			};
			updatePost(
				{ postId: id, payload },
				{
					onSuccess: (res) => {
						if (res.success) {
							queryClient.invalidateQueries({ queryKey: ['posts'] });
							toast.success('Cập nhật thành công!');
							navigate('/manage-post');
						} else {
							toast.error(res.message || 'Cập nhật thất bại');
						}
					},
					onError: (err: any) => {
						setIsUploading(false);
						toast.error(err?.response?.data?.message || 'Có lỗi xảy ra');
					},
				},
			);
		}
	};

	if (isPostLoading) return <div className="py-10 text-center">Đang tải dữ liệu...</div>;

	return (
		<div className="min-h-screen bg-gray-100 py-6">
			<div className="container mx-auto max-w-4xl px-4">
				<div className="bg-white p-4 rounded-lg shadow-sm">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4">
						<div className="space-y-3">
							<h3 className="text-lg font-semibold mb-10">Hình ảnh và Video sản phẩm</h3>
							<div>
								{previewUrls.length === 0 ? (
									<div
										className="relative border-2 border-dashed border-orange-300 rounded-lg p-4 bg-gray-50 w-[320px] cursor-pointer"
										onClick={() => fileInputRef.current?.click()}
									>
										<div
											className="absolute right-2 top-1 flex items-center gap-1 select-none"
											style={{ zIndex: 2 }}
										>
											<Info className="w-3 h-3 text-blue-500" />
											<span className="text-xs text-blue-500 font-normal leading-none">
												Hình ảnh hợp lệ
											</span>
										</div>
										<div className="flex flex-col items-center space-y-3 justify-center h-full">
											<div className="w-20 h-20 border-2 border-dashed border-orange-300 rounded-lg flex items-center justify-center">
												<Camera className="w-8 h-8 text-orange-400" />
											</div>
											<p className="text-gray-600 text-sm text-center">
												ĐĂNG TỪ 01 ĐẾN 06 HÌNH
											</p>
										</div>
									</div>
								) : (
									<div>
										<div className="flex flex-wrap gap-3">
											{previewUrls.map((url, idx) => (
												<div
													key={idx}
													className="relative w-32 h-24 rounded overflow-hidden border border-orange-300 bg-white flex items-center justify-center"
													draggable
													onDragStart={() => handleDragStart(idx)}
													onDragEnter={() => handleDragEnter(idx)}
													onDragEnd={handleDragEnd}
													onDragOver={(e) => e.preventDefault()}
												>
													<img
														src={url}
														alt={`preview-${idx}`}
														className="object-cover w-full h-full"
													/>
													<button
														type="button"
														className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
														onClick={() => handleRemoveImage(idx)}
														tabIndex={-1}
													>
														×
													</button>
													{idx === 0 && (
														<span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs text-center py-1">
															Hình bìa
														</span>
													)}
												</div>
											))}
											{previewUrls.length < 6 && (
												<div
													className="w-32 h-24 border-2 border-dashed border-orange-300 rounded flex items-center justify-center cursor-pointer bg-gray-50"
													onClick={() => fileInputRef.current?.click()}
												>
													<span className="text-3xl text-orange-400 font-bold">+</span>
												</div>
											)}
										</div>
										<p className="text-xs text-gray-500 mt-2">
											Nhấn và giữ để di chuyển hình ảnh
										</p>
									</div>
								)}
								<input
									ref={fileInputRef}
									type="file"
									multiple
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
									id="file-upload"
								/>
							</div>
						</div>

						<div className="space-y-4 -ml-4">
							{errors.images && (
								<div className="mb-2">
									<div className="flex items-center bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
										<svg
											className="w-5 h-5 mr-2 text-red-500"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span>{errors.images}</span>
									</div>
								</div>
							)}
							<div>
								<Label htmlFor="category" className="text-sm font-medium">
									Danh Mục Tin Đăng *
								</Label>
								<Select
									value={category}
									onValueChange={setCategory}
									disabled={isCategoriesLoading || !categories}
								>
									<SelectTrigger
										className="mt-2 w-full border"
										style={errors.category ? { borderColor: '#dc2626' } : {}}
									>
										<SelectValue
											placeholder={isCategoriesLoading ? 'Đang tải...' : 'Chọn danh mục'}
										/>
									</SelectTrigger>
									<SelectContent>
										{categories &&
											categories.length > 0 &&
											categories.map((cat) => (
												<SelectItem key={cat.id} value={cat.id}>
													{cat.name}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								{errors.category && (
									<p className="text-sm text-red-600 mt-1">{errors.category}</p>
								)}
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 mt-8">Thông tin chi tiết</h3>
								<div className="space-y-3">
									<div>
										<Label htmlFor="age" className="text-sm">
											Độ tuổi *
										</Label>
										<Select value={age} onValueChange={setAge}>
											<SelectTrigger className="mt-2 w-full" id="age">
												<SelectValue placeholder="Chọn độ tuổi" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="PUPPY">Chó con</SelectItem>
												<SelectItem value="YOUNG_DOG">Chó nhỏ</SelectItem>
												<SelectItem value="ADULT_DOG">Chó trưởng thành</SelectItem>
											</SelectContent>
										</Select>
										{errors.age && (
											<p className="text-sm text-red-600 mt-1">{errors.age}</p>
										)}
									</div>
									<div>
										<Label htmlFor="size" className="text-sm">
											Kích cỡ thú cưng *
										</Label>
										<Select value={size} onValueChange={setSize}>
											<SelectTrigger className="mt-2 w-full" id="size">
												<SelectValue placeholder="Chọn kích cỡ" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="MINI">Mini</SelectItem>
												<SelectItem value="SMALL">Nhỏ</SelectItem>
												<SelectItem value="MEDIUM">Vừa</SelectItem>
												<SelectItem value="LARGE">Lớn</SelectItem>
											</SelectContent>
										</Select>
										{errors.size && (
											<p className="text-sm text-red-600 mt-1">{errors.size}</p>
										)}
									</div>
									<div>
										<Label htmlFor="price" className="text-sm">
											Giá bán *
										</Label>
										<Input
											id="price"
											className="mt-1"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
										/>
										{errors.price && (
											<p className="text-sm text-red-600 mt-1">{errors.price}</p>
										)}
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 mt-12">
									Tiêu đề tin đăng và Mô tả chi tiết
								</h3>
								<div className="space-y-4">
									<div>
										<Label htmlFor="post-title" className="text-sm">
											Tiêu đề tin đăng *
										</Label>
										<Input
											id="post-title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className={`mt-1 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
											maxLength={50}
										/>
										{errors.title && (
											<p className="text-sm text-red-600 mt-1">{errors.title}</p>
										)}
										<p className="text-xs text-gray-400 mt-1">{title.length}/50 kí tự</p>
									</div>
									<div>
										<Label htmlFor="detailed-description" className="text-sm">
											Mô tả chi tiết *
										</Label>
										<textarea
											id="detailed-description"
											placeholder="Mô tả chi tiết về sản phẩm của bạn..."
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className={`w-full min-h-[100px] max-h-[150px] resize-y overflow-y-auto border rounded-md px-3 py-2 mt-1 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
											maxLength={1500}
										/>
										{errors.description && (
											<p className="text-sm text-red-600 mt-1">{errors.description}</p>
										)}
										<p className="text-xs text-gray-400 mt-1">
											{description.length}/1500 kí tự
										</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold mb-4 pb-2 mt-12">
									Thông tin người bán
								</h3>
								<div className="space-y-3">
									<Label htmlFor="location" className="text-sm">
										Khu vực *
									</Label>
									<div
										className="mt-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50"
										onClick={() => setShowAddressDialog(true)}
									>
										{address ? (
											<p className="text-sm">
												{address.specificAddress}
												{address.specificAddress ? ', ' : ''}
												{address.wardLabel}
												{address.wardLabel ? ', ' : ''}
												{address.provinceLabel}
											</p>
										) : (
											<p className="text-gray-400 text-sm">Chọn địa chỉ</p>
										)}
									</div>
									{errors.address && (
										<p className="text-sm text-red-600 mt-1">{errors.address}</p>
									)}
								</div>
							</div>

							<div className="flex justify-end space-x-4 pt-4">
								<Button
									variant="outline"
									className="px-6 border-gray-500 text-gray-500 hover:bg-gray-100"
									onClick={() => navigate(-1)}
									disabled={isUpdating}
								>
									Hủy
								</Button>
								<Button
									onClick={handleSubmit}
									className="bg-orange-500 hover:bg-orange-600 px-6"
									disabled={isUpdating || isUploading}
								>
									{isUpdating || isUploading ? 'Đang xử lý...' : 'Cập nhật'}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{showAddressDialog && (
					<AddressDialog
						isOpen={showAddressDialog}
						onClose={() => setShowAddressDialog(false)}
						onSave={(value: {
							province: string;
							provinceLabel: string;
							ward: string;
							wardLabel: string;
							specificAddress: string;
						}) => {
							setAddress(value);
							setShowAddressDialog(false);
						}}
						initialAddress={address || undefined}
					/>
				)}
			</div>
		</div>
	);
};

export default UpdatePost;
