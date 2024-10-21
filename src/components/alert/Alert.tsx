import styleAlert from"./alert.module.css"

interface AlertProps {
    title: string;
    description: string;
    btn: string;
    show: boolean;
    onClose: () => void;
  }
export const Alert: React.FC<AlertProps> = ({ title, description, btn, show, onClose }) => {
    
     if(!show){
        return null;
    }
    return (
        <section className={styleAlert.modal_background}>
            <div className={styleAlert.modal}>
                <h4>{title}</h4>
                <p>{description}</p>
                <div className={styleAlert.btn}>
                    <button onClick={onClose}>{btn}</button>
                </div>
            </div>
        </section>
    )
}
