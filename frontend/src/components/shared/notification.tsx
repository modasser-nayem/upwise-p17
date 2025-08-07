"use client";
import { useAppSelector } from "@/hooks";
import { useNotificationSocket } from "@/hooks/use-notification";
import {
	useLazyNotiFicationByUserIdQuery,
	useMakeReadMutation,
	useMakeAllReadMutation,
} from "@/redux/api/notificationApi";
import { selectedUser } from "@/redux/slice/authSlice";
import { Badge } from "@/components/ui/badge";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import moment from "moment";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { TNotificationResponse } from "@/types/notification.types";

export default function Notification() {
	const user = useAppSelector(selectedUser);
	const observerRef = useRef<HTMLLIElement | null>(null);

	const [notifications, setNotifications] = useState<TNotificationResponse[]>(
		[]
	);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const [fetchNotifications] = useLazyNotiFicationByUserIdQuery();
	const [makeRead] = useMakeReadMutation();
	const [makeAllRead] = useMakeAllReadMutation();

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	useNotificationSocket({
		userId: user?.id as string,
		onNewNotification: () => {
			setPage(1);
			setNotifications([]);
			setHasMore(true);
		},
	});

	const loadNotifications = useCallback(
		async (page: number) => {
			if (user?.role === "admin") return;

			setLoading(true);
			const res = await fetchNotifications({
				order: "desc",
				page: page.toString(),
				limit: "5",
			}).unwrap();
			if (res?.result) {
				if (page === 1) {
					setNotifications(res.result);
				} else {
					setNotifications((prev) => [...prev, ...res.result]);
				}
				if (res.result.length < 10) setHasMore(false);
			}
			setLoading(false);
		},
		[user?.role, fetchNotifications]
	);

	useEffect(() => {
		loadNotifications(page);
	}, [page, loadNotifications]);

	// Infinite scroll
	useEffect(() => {
		if (!observerRef.current || !hasMore) return;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !loading) {
				setPage((prev) => prev + 1);
			}
		});

		observer.observe(observerRef.current);

		return () => observer.disconnect();
	}, [hasMore, loading]);

	if (user?.role === "admin") return null;

	return (
		<Popover>
			<PopoverTrigger>
				<div className="relative">
					<Bell />
					{unreadCount > 0 && (
						<Badge className="size-6 -top-3 -right-3 absolute text-secondary bg-primary flex items-center justify-center rounded-full hover:bg-primary hover:text-secondary">
							{unreadCount}
						</Badge>
					)}
				</div>
			</PopoverTrigger>

			<PopoverContent className="bg-white border rounded-lg shadow-md z-50 max-h-96 overflow-y-auto w-80 p-0">
				<div className="p-3 flex justify-between items-center">
					<h4 className="font-bold">Notifications</h4>
					{loading && page === 1 && <p>Loading...</p>}
					{unreadCount > 0 && (
						<button
							onClick={() =>
								makeAllRead().then(() => loadNotifications(1))
							}
							className="text-xs text-primary"
						>
							Mark all as read
						</button>
					)}
				</div>

				<ul>
					{notifications.map((notification, i) => (
						<li
							key={notification._id}
							ref={
								i === notifications.length - 1
									? observerRef
									: null
							}
							onClick={() =>
								makeRead(notification._id).then(() =>
									loadNotifications(1)
								)
							}
							className={cn(
								"p-3 border-t hover:bg-gray-100 cursor-pointer",
								!notification.isRead
									? "bg-blue-50 font-semibold"
									: ""
							)}
						>
							<p className="text-sm">{notification.message}</p>
							<small className="text-xs text-gray-shade-60">
								{moment(notification.createdAt).fromNow()}
							</small>
						</li>
					))}

					{!loading && notifications.length === 0 && (
						<li className="text-center p-4 text-gray-500">
							No notifications
						</li>
					)}

					{loading && page > 1 && (
						<li className="text-center p-3 text-sm text-gray-400">
							Loading more...
						</li>
					)}
				</ul>
			</PopoverContent>
		</Popover>
	);
}
