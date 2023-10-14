import axios from "axios";

export const approval = (io) => {

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('form_data', (data) => {
            io.emit("form_data", data)
        });

        socket.on('receive_approval', (data) => {
            io.emit(`receive_approval_decision_${data.secondaryID}`, data)
        })

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    })
}