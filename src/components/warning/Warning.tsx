import styleWarning from "./warning.module.css";

interface WarningProps{
    description: string;
    accept: string;
    cancel: string;
    show: boolean;
    onClose: () => void;
    onOpen: () => void;

}

export const Warning : React.FC<WarningProps>= ({ description, accept, cancel,show, onClose, onOpen }) => {
    if(!show){
        return null;
    }
    return (
        <section className={styleWarning.modal_background}>
        <div className={styleWarning.modal}>
            <span></span>
            <p>{description}</p>
            <div className={styleWarning.btn}>
                <button onClick={onOpen} className={styleWarning.btn_accept}>{accept}</button>
                <button onClick={onClose} className={styleWarning.btn_cancel}>{cancel}</button>
            </div>
        </div>
        </section>
    )
}
