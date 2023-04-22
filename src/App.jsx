import { Canvas ,useFrame,useLoader} from "@react-three/fiber";
import { Suspense } from "react";
import {useControls} from 'leva'
import './App.css'
import { Environment, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";

import { Model } from "./components/three/Model";

import {gsap} from "gsap";

import * as THREE from 'three'

import { angleToRadians } from "./utility/angle";


function Sphere() {

  const repeatX = 500;
  const repeatY =500;

  const map = useLoader(THREE.TextureLoader, "/textures/mud/forest_ground_04_diff_2k.jpg");
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(repeatX, repeatY);

  const displacementMap = useLoader(THREE.TextureLoader, "/textures/mud/forest_ground_04_disp_2k.jpg");
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.set(repeatX, repeatY);

  const aoMap = useLoader(THREE.TextureLoader, "/textures/mud/forest_ground_04_ao_2k.jpg");
  aoMap.wrapS = THREE.RepeatWrapping;
  aoMap.wrapT = THREE.RepeatWrapping;
  aoMap.repeat.set(repeatX, repeatY);

  const roughnessMap = useLoader(THREE.TextureLoader, "/textures/mud/forest_ground_04_rough_2k.jpg");
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.repeat.set(repeatX, repeatY);

  const normalMap = useLoader(THREE.TextureLoader, "/textures/mud/forest_ground_04_nor_dx_2k.jpg");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(repeatX, repeatY);


  const skyMap = useLoader(THREE.TextureLoader, "/sunset-4011217_960_720.jpg");



  const {displacementScale,aoMapIntensity}=useControls({
    displacementScale:{
      value:1,
      min:-2,
      max:2,
    },
    aoMapIntensity:{
      value:1,
      min:0,
      max:10,
    }
  })



  return (
    <>
    <PerspectiveCamera makeDefault position={[0,2,5]}/>
    <OrbitControls />

     <Model/>

     <mesh rotation={[-angleToRadians(90),0,0]} receiveShadow >
      <planeGeometry args={[1000,1000]}/>
      <meshStandardMaterial map={map} displacementMap={displacementMap} aoMap={aoMap} normalMap={normalMap} roughnessMap={roughnessMap}  normalMap-encoding={THREE.LinearEncoding} transparent displacementScale={displacementScale} aoMapIntensity={aoMapIntensity}/>
     </mesh>

     <Environment background={true}>
      <mesh>
        <sphereGeometry args={[50,100,100]} />
        <meshBasicMaterial side={THREE.BackSide} color="white" map={skyMap} rotation={[0,angleToRadians(60),0]}/>
      </mesh>
     </Environment>
     </>
  );
}

function App() {
  return(
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={null}>
      <ambientLight args={["#f9e135",5]}/>
      <directionalLight args={["orange", 30]} position={[30,2,0]}/>
         <Sphere />
      </Suspense>
    </Canvas>
  )
}

export default App