import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";

const TOTAL_SEATS = 8;

let seats = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
  id: i + 1,
  user: null as null | { id: string; name: string },
}));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log(" Socket server started");

    const io = new Server(
      res.socket.server as any,
      { path: "/api/socket/io" }
    );

    io.on("connection", (socket) => {
      socket.emit("seats:update", seats);

      socket.on("seat:join", (name: string) => {
        const emptySeat = seats.find((s) => !s.user);
        if (!emptySeat) return;

        emptySeat.user = { id: socket.id, name };
        io.emit("seats:update", seats);
      });

      socket.on("disconnect", () => {
        seats = seats.map((seat) =>
          seat.user?.id === socket.id
            ? { ...seat, user: null }
            : seat
        );
        io.emit("seats:update", seats);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
