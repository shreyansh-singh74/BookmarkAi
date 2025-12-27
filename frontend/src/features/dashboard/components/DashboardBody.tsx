import { AddBookmarkDialog } from "./AddBookmarkDialog";
import { BookmarkList } from "./BookmarkList";

export default function DashboardBody() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Bookmarks</h2>
        <AddBookmarkDialog />
      </div>

      <BookmarkList />
    </div>
  );
}