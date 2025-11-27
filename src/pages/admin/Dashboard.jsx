import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
	return (
		<>
			<h1 className="text-2xl font-bold mb-6">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Tổng số người dùng</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">1,234</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Tin đang hoạt động</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">456</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Người dùng mới trong tuần</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">89</p>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
