import { Router } from 'express';
import { db } from '../database.js';
import {
  authenticateToken,
  requireRole
} from "../middleware/auth.js";

export const tasksRouter = Router();

function part3NotImplemented(req, res, next) {
  return res.status(501).json({
    error: "Part 3 middleware has not been implemented."
  });
}

tasksRouter.get(
    "/",
    authenticateToken,
    (req, res) => {
      res.json({
        userId: req.user.sub,
        tasks: []
      });
    }
);

tasksRouter.get('/:id',
    authenticateToken,
    requireRole("instructor", "student"),
    async (req, res, next) => {
      try {
        const sql = "SELECT id, title, course, student_id AS studentId, completed FROM tasks WHERE id = ?";
        const result = await db.query(sql, [req.params.id]);
        const task = result.rows[0];

        if (task == undefined) {
          return res.status(404).json({ error: "Not Found" });
        }

        if (req.user.role == "student" && task.studentId != req.user.sub) {
          return res.status(403).json({ error: "Forbidden" });
        }

        return res.status(200).json({
          ...task,
          completed: Boolean(task.completed)
        });
      } catch (error) {
        return next(error);
      }
    });

tasksRouter.delete(
    "/:id",
    authenticateToken,
    requireRole("instructor"),
    async (req, res, next) => {
      try {
        const result = await db.run(
            "DELETE FROM tasks WHERE id = ?",
            [req.params.id]
        );

        if (result.changes === 0) {
          return res.status(404).json({ error: "Not Found" });
        }

        return res.status(204).end();
      } catch (error) {
        return next(error);
      }
    }
);
