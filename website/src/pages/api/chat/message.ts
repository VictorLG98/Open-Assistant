import axios from "axios";
import { IncomingMessage } from "http";
import { withoutRole } from "src/lib/auth";

import { INFERENCE_URL } from ".";

const handler = withoutRole("banned", async (req, res, token) => {
  const { id, message } = req.body;

  const { data } = await axios.post<IncomingMessage>(
    INFERENCE_URL + `/chat/${id}/message`,
    { message },
    { responseType: "stream" }
  );
  res.status(200);
  data.pipe(res);
});

export default handler;
