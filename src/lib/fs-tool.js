import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile} = fs

const postJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/post.json")
const commentJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/comment.json")
const publicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../public/img/blogPost")

export const getPost = () => readJSON(postJSONPath)
export const writePost = content => writeJSON(postJSONPath, content)
export const getComment = () => readJSON(commentJSONPath)
export const writeComment = content => writeJSON(commentJSONPath, content)

export const PostPicture = (filename, contentAsBuffer) => writeFile(join(publicFolderPath, filename), contentAsBuffer)