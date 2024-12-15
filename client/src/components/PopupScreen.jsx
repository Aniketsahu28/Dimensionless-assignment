import { useRecoilValue } from "recoil";
import { popupAtom } from '../store/popupAtom'
import AddTodoPopup from "./AddTodoPopup";
import DeleteallTodoPopup from "./DeleteallTodoPopup";

const PopupScreen = () => {
    const popup = useRecoilValue(popupAtom)
    return (
        <div
            className={`${(popup === 'addtodo' || popup === 'deletealltodo') ? "fixed" : "hidden"
                } h-full w-full bg-black/80 z-30 top-0 left-0`}
        >
            {popup === "addtodo" && (
                <AddTodoPopup />
            )}
            {popup === "deletealltodo" && (
                <DeleteallTodoPopup />
            )}
        </div>
    );
};

export default PopupScreen;