import "./Modal.css";

const ModalElement = ({ children, isOpen, closeModal }:{children:any, isOpen:boolean, closeModal:()=>void}) => {
  const handleModalContainerClick = (e:any) => e.stopPropagation();

  return (
    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default ModalElement;
