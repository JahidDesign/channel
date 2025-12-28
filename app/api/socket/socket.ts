import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";

const TOTAL_SEATS = 12;

type Seat = {
  id: number;
  user: null | {
    id: string;
    name: string;
  };
};

let seats: Seat[] = Array.from({ length: TOTAL_SEATS }, (_, i) => ({
  id: i + 1,
  user: null,
}));

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log(" Socket server started");

    const io = new Server(res.socket.server as any, {
      path: "/api/socket/io",
    });

    io.on("connection", (socket) => {
      // Send current seats to new user
      socket.emit("seats:update", seats);

      // JOIN SEAT
      socket.on("seat:join", (name: string) => {
        const emptySeat = seats.find((s) => !s.user);
        if (!emptySeat) return;

        emptySeat.user = {
          id: socket.id,
          name,
        };

        io.emit("seats:update", seats);
      });

      // LEAVE SEAT (manual)
      socket.on("seat:leave", () => {
        seats = seats.map((seat) =>
          seat.user?.id === socket.id
            ? { ...seat, user: null }
            : seat
        );

        io.emit("seats:update", seats);
      });

      // AUTO LEAVE ON DISCONNECT
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
