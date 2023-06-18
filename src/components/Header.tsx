import React from "react";
import { setSortInOrder, clearMessages } from "../store/slices/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Btn from "./Btn";

const Header: React.FC = () => {
    const sortInOrder = useSelector((state: RootState) => state.sortInOrder);
    const dispatch = useDispatch();

    const onChangeSortInOrderHandler = () => {
        dispatch(setSortInOrder());
    }

    const onClearHandler = () => {
        dispatch(clearMessages());
    }

    return (
        <div className="container">
            <div className="header">
                <div className="header-sort">
                    <div className="header-sort__title">
                        Сортировать по: {sortInOrder ? "новое снизу" : "новое сверху"}
                    </div>
                    <div className="header-sort__buttons">
                        <Btn
                            text="Изменить"
                            style="header-sort__btn"
                            onClick={onChangeSortInOrderHandler}
                        />
                        <Btn
                            text="Очистить ленту"
                            style="header-sort__btn"
                            onClick={onClearHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;