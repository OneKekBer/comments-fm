import { useUser } from "@clerk/clerk-react";

import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "nanoid";

import { RootState, addComment, deleteComments } from "../store";
import Comment from "./Comment";
// interface User {
//     id: number | string;
//     imageUrl: string;
// }

interface Comments {
    id: number | string;
    create_by?: string;
    text: string;
    ava?: string;
    is_editmode: boolean;
    // replies?: Replies[];
}

export const Main = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state: RootState) => state.comments.comments);
    const [areaText, setAreaText] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(
            addComment({
                text: areaText,
                create_by: user?.id,
                id: nanoid(),
                ava: user?.imageUrl,
                is_editmode: false,
            })
        );

        setAreaText("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setAreaText(e.currentTarget.value);
    };
    const { isSignedIn, user } = useUser();

    return (
        <div className="wrapper">
            <div className="comments flex items-center flex-col mb-10">
                {comments.map((comment: Comments) => {
                    const { create_by } = comment;
                    const is_creator: boolean = create_by === user?.id;

                    return (
                        <Comment
                            key={nanoid()}
                            comment={comment}
                            is_creator={is_creator}
                        />
                    );
                })}
            </div>
            {isSignedIn ? (
                <div className="form">
                    <div className=" flex items-center flex-col">
                        <div className=" rounded-xl bg-lightgrey h-auto w-full lg:w-2/3 p-5 flex  justify-start items-start">
                            <img
                                className="w-[40px] rounded-full"
                                src={user.imageUrl}
                                alt=""
                            />

                            <form
                                action=""
                                className="w-full flex items-start gap-5"
                                onSubmit={handleSubmit}
                            >
                                <textarea
                                    onChange={handleChange}
                                    name="write"
                                    value={areaText}
                                    className="w-full h-auto min-h-[100px] flex justify-start items-start"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="bg-blue-700 px-5 hover:bg-blue-300 ease-in py-3 rounded font-bold text-white"
                                >
                                    submit
                                </button>
                            </form>

                            <div></div>
                        </div>
                        <button
                            onClick={() => {
                                dispatch(deleteComments());
                            }}
                        >
                            delete all
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Main;
