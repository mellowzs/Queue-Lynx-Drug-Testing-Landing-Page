export default function SubmitSection({ errorMessage }) {
  return (
    <div className="pb-4">
      <div className="flex flex-col items-end gap-2">
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 w-32 rounded hover:bg-blue-900 transition"
        >
          Submit
        </button>
        {errorMessage && (
          <div
            className={`text-sm p-3 rounded-lg ${
              errorMessage.includes("✅")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            } text-center w-full`}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
