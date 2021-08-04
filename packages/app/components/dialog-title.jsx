export default function DialogTitle({title, onClose}) {
  return (
    <div className="flex justify-between mb-2">
      <div className="font-bold flex-grow text-lg">{title}</div>
      {onClose && (
        <button type="button" onClick={onClose}>
          <i className="fad fa-times" />
        </button>
      )}
    </div>
  );
}
