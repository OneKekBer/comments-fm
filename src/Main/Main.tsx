import { useUser } from "@clerk/clerk-react";

import React, { ChangeEvent } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { nanoid } from "nanoid";

import {
    RootState,
    addComment,
    deleteComment,
    deleteComments,
    editComment,
    toggleEditmode,
} from "../store";
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
    const [areaText, setAreaText] = useState();

    const handleSubmit = (e: React.FormEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log(areaText);

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

    const handleChange = (e: ChangeEvent): void => {
        setAreaText(e.currentTarget.value);
    };
    const { isSignedIn, user } = useUser();

    console.log(isSignedIn);
    console.log(user);

    return (
        <div className="wrapper">
            <div className="comments flex items-center flex-col mb-10">
                <div>
                    {comments.map((comment: Comments) => {
                        const { create_by } = comment;
                        const is_creator: boolean = create_by === user?.id;

                        return (
                            <Comment
                                comment={comment}
                                is_creator={is_creator}
                            />
                        );
                    })}
                </div>
            </div>
            {isSignedIn ? (
                <div className="form">
                    <div className=" flex items-center flex-col">
                        <div className=" rounded-xl bg-lightgrey h-auto w-1/2 p-5 flex  justify-start items-start">
                            <img
                                className="w-[40px]"
                                src={user.imageUrl}
                                alt=""
                            />

                            <form
                                action=""
                                className="w-full"
                                onSubmit={handleSubmit}
                            >
                                <textarea
                                    onChange={handleChange}
                                    name="write"
                                    value={areaText}
                                    className="w-full h-auto min-h-[100px] flex justify-start items-start"
                                ></textarea>
                                <input type="submit" />
                            </form>
                            <button
                                onClick={() => {
                                    window.dispatch(deleteComments());
                                }}
                            >
                                delete
                            </button>

                            <div></div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};
export default Main;
