import multer from "multer";
import { resolve } from 'path'

import Aluno from "../../models/Aluno";
import multerConfig from "../../config/multerConfig";

const upload = multer(multerConfig).single('file');

class PhotoController {
  async create(req, res) {
    return upload(req, res, (error) => {
      if (error) {
        return res.status(400).json({ error: [error.code] });
      }

      Aluno.postPhotoToAluno(req.params.id, req.file.filename);
      res.json(req.file);
    });

  }
}

export default new PhotoController();
