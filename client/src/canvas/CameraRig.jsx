import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobil = window.innerWidth <= 600;

    // Set The Initial Position of The Model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobil) targetPosition = [0, 0.35, 3.5];
    } else {
      if (isMobil) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    //Set Model Camera Position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Set The Model Rotation Smoothly
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
