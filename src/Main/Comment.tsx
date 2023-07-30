import React, { useState } from "react";

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

export const Comment = ({ comment, is_creator }: CommentProps) => {
    const { text, create_by, id, ava, is_editmode } = comment;
    const dispatch = useDispatch();
    const [editText, setEditText] = useState(text);

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(editComment({ id: id, text: editText }));
        dispatch(toggleEditmode(id));
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(e.target.value);
    };
    return (
        <div className="comment_reply_wrapper w-full lg:w-2/3 flex flex-col ">
            <div className="comment my-5 rounded-xl bg-lightgrey h-auto  p-5 flex flex-col justify-start items-center">
                <div className="w-full">
                    <div className="ava flex gap-5 justify-between mb-5">
                        <div className="flex gap-5 items-center">
                            <img
                                src={ava}
                                className="w-[40px] rounded-full"
                                alt=""
                            />

                            <div className="font-bold">
                                {create_by?.substring(0, 10)}
                            </div>
                            <div>day ago</div>
                            <div>reply</div>
                        </div>

                        {is_creator ? (
                            <div className="flex gap-5">
                                <button
                                    className=" text-red-600 font-semibold"
                                    onClick={() => {
                                        dispatch(deleteComment(id));
                                    }}
                                >
                                    delete
                                </button>
                                <button
                                    className="text-blue-400"
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
                                className="w-full flex items-start gap-5"
                                onSubmit={handleEditSubmit}
                            >
                                <textarea
                                    autoFocus
                                    onFocus={function (e) {
                                        const val = e.target.value;
                                        e.target.value = "";
                                        e.target.value = val;
                                    }}
                                    onChange={handleEditChange}
                                    name="write"
                                    value={editText}
                                    className="w-full h-auto min-h-[100px] flex justify-start items-start"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="bg-blue-700 px-5 hover:bg-blue-300 ease-in py-3 rounded font-bold text-white"
                                >
                                    submit
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>{text}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comment;
