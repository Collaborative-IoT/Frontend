import { TransportOptions } from "mediasoup-client/lib/types";
import { useVoiceStore } from "../stores/useVoiceStore";

export async function createTransport(
  conn: any,
  _roomId: string,
  direction: "recv" | "send",
  transportOptions: TransportOptions
) {

}
