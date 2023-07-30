import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment, toggleEditmode } from "../store";

interface Comments {
    id: number | string;
    create_by?: string;
    text: string;
    ava?: string;
    is_editmode: boolean;
    // replies?: Replies[];
}

interface CommentProps {
    comment: Comments;
    is_creator: boolean;
}

export const Comment: React.FC = ({ comment, is_creator }): CommentProps => {
    const { text, create_by, id, ava, is_editmode } = comment;
    const dispatch = useDispatch();
    const [editText, setEditText] = useState(text);
    const textareaRef = useRef(null);

    const handleEditSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        dispatch(editComment({ id: id, text: editText }));
        dispatch(toggleEditmode(id));
    };

    const handleEditChange = (e: React.ChangeEvent) => {
        setEditText(e.target.value);
    };
    return (
        <div>
            <div
                key={nanoid()}
                className="comment_reply_wrapper flex flex-col "
            >
                <div className="comment my-5 rounded-xl bg-lightgrey h-auto  p-5 flex flex-col justify-start items-center">
                    <div className="w-full">
                        <div className="ava flex gap-5 justify-between">
                            <div className="flex gap-5">
                                <img
                                    src={ava}
                                    className="w-[40px] rounded"
                                    alt=""
                                />

                                <div className="font-bold">{create_by}</div>
                                <div>day ago</div>
                                <div>reply</div>
                            </div>

                            {is_creator ? (
                                <div className="flex gap-5">
                                    <button
                                        onClick={() => {
                                            dispatch(deleteComment(id));
                                        }}
                                    >
                                        delete
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(toggleEditmode(id));
                                        }}
                                    >
                                        edit
                                    </button>
                                </div>
                            ) : null}
                        </div>
                        {is_editmode ? (
                            <div className="w-full">
                                <form
                                    action=""
                                    className="w-full"
                                    onSubmit={handleEditSubmit}
                                >
                                    <textarea
                                        autoFocus
                                        onFocus={function (e) {
                                            let val = e.target.value;
                                            e.target.value = "";
                                            e.target.value = val;
                                        }}
                                        onChange={handleEditChange}
                                        name="write"
                                        value={editText}
                                        className="w-full h-auto min-h-[100px] flex justify-start items-start"
                                    ></textarea>
                                    <input type="submit" />
                                </form>
                            </div>
                        ) : (
                            <div>{text}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
