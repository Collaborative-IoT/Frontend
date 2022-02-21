import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { useCurrentRoomIdStore } from "../../global-stores/useCurrentRoomIdStore";
import { useMuteStore } from "../../global-stores/useMuteStore";
import { useDeafStore } from "../../global-stores/useDeafStore";
import { ActiveSpeakerListener } from "./components/ActiveSpeakerListener";
import { AudioRender } from "./components/AudioRender";
import { useMicIdStore } from "./stores/useMicIdStore";
import { useVoiceStore } from "./stores/useVoiceStore";
import { consumeAudio } from "./utils/consumeAudio";
import { createTransport } from "./utils/createTransport";
import { joinRoom } from "./utils/joinRoom";
import { receiveVoice } from "./utils/receiveVoice";
import { sendVoice } from "./utils/sendVoice";


export function closeVoiceConnections(_roomId: string | null) {
  const { roomId, mic, nullify } = useVoiceStore.getState();
  if (_roomId === null || _roomId === roomId) {
    if (mic) {
      console.log("stopping mic");
      mic.stop();
    }

    console.log("nulling transports");
    nullify();
  }
}

export const WebRtcApp: React.FC = () => {
  const { mic } = useVoiceStore();
  const { micId } = useMicIdStore();
  const { muted } = useMuteStore();
  const { deafened } = useDeafStore();
  const { setCurrentRoomId } = useCurrentRoomIdStore();
  const initialLoad = useRef(true);
  const { push } = useRouter();

  useEffect(() => {
    if (micId && !initialLoad.current) {
      sendVoice();
    }
    initialLoad.current = false;
  }, [micId]);
  const consumerQueue = useRef<{ roomId: string; d: any }[]>([]);

  function flushConsumerQueue(_roomId: string) {}

  return (
    <>
      <AudioRender />
      <ActiveSpeakerListener />
    </>
  );
  
};
