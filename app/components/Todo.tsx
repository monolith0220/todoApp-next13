"use client";

import { deleteTodo, editTodo } from "../api";
import { Task } from "../types";
import { useRef, useState, useEffect } from "react";

interface TodoProps {
	todo: Task;
}

export const Todo = ({ todo }: TodoProps) => {
	const ref = useRef<HTMLInputElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [editedTask, setEditedTask] = useState(todo.text);

	useEffect(() => {
		if (isEditing) {
			ref.current?.focus();
		}
	}, [isEditing]);

	const handleEdit = async () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		await editTodo(todo.id, editedTask);
		setIsEditing(false);
	};

	const handleDelete = async () => {
		await deleteTodo(todo.id);
	};

	return (
		<li
			key={todo.id}
			className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
		>
			{isEditing ? (
				<input
					ref={ref}
					type="text"
					className="mr-2 py-2 px-2 rounded border-blue-500 shadow"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEditedTask(e.target.value)
					}
					value={editedTask}
				/>
			) : (
				<span>{todo.text}</span>
			)}

			<div>
				{isEditing ? (
					<button className="text-blue-500 mr-3" onClick={handleSave}>
						save
					</button>
				) : (
					<button className="text-green-500 mr-3" onClick={handleEdit}>
						Edit
					</button>
				)}

				<button className="text-red-400" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</li>
	);
};
