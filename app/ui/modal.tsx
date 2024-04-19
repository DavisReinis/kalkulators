import React, {useState} from 'react';
import { ieraksti } from "@/app/definitions";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: number) => void;
  setOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, setOpen}) => {
  if (!isOpen) return null;
  const [records, setRecords] = useState<ieraksti[] | []>(JSON.parse(localStorage.getItem("aprekinuIeraksti") || "[]"))
  const handleBackdropClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  const handleModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };


  const handleDelete = (id:number) => {
    let data = JSON.parse(localStorage.getItem("aprekinuIeraksti") || "[]");
    data = data.filter((i:ieraksti) => i.id !== id);
    localStorage.setItem("aprekinuIeraksti", JSON.stringify(data));
    setRecords(data);
  }


  return (
    <div className="modalBackdrop" onClick={handleBackdropClick}>
      <div className="modalContent" onClick={handleModalContentClick} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <div className="flex justify-between items-center pb-4 pt-2">
          <h1 className="text-2xl font-semibold">Saglabātie Aprēķini:</h1>
          <span  onClick={onClose} className="text-gray-500 float-right text-2xl font-bold cursor-pointer">
            &times;
          </span>
        </div>
        {records.length === 0 ? (
          <p>Nav saglabātu datu</p>
        ) : (
          <div className="space-y-4">
            {records.map((entry) => (
              <div key={entry.id} className="border-y items-end shadow p-2 md:grid grid-cols-5 hover:bg-gray-100">
                <p>Bruto: <strong>{entry.bruto.toFixed(2)}</strong></p>
                <p>Neto: <strong>{entry.neto.toFixed(2)}</strong></p>
                <p>{new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString()}</p>
                <Button variant={"link"} className={"items-end p-0 justify-end"}
                        onClick={() => onConfirm(entry.id)}>
                  Redzēt pilnu aprēķinu
                </Button>
                <Button variant={"link"} className={"items-end p-0 justify-end"} onClick={() => {
                  handleDelete(entry.id)
                  setOpen()
                }}>
                  Dzēst
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
