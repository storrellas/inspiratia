import Item from "@/lib/models/Item";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  item: Item | null;
};

const ModalDetail = ({ item, show, onClose }: ModalProps) => {
  if (!show || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Detail</h2>
        <hr className="text-gray-300 mb-4"></hr>

        <p className="mb-6 text-gray-600 mt-3">
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Id:
          </label>
          <input type="number" value={item.id || 0} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            User Id:
          </label>
          <input type="number" value={item.userId || 0} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>            
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Body:
          </label>
          <input type="text" value={item.body} readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700 mt-3">
            Title:
          </label>
          <input type="text" value={item.title}  readOnly
            className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 cursor-pointer">
            Cancel
          </button>

          <button onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;