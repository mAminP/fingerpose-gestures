<template>
  <v-row no-gutters class="fill-height" align="center" justify="center">
    <v-col>
      <v-row dense v-for="(arr, index) in poseData" :key="index">
        <v-col v-for="(s, i) in arr" :key="i"><span v-text="s"></span></v-col>
      </v-row>
      <v-divider class="my-3" />
      <v-row>
        <v-col v-for="(value, name) in bestMatch" :key="name"
          >{{ name }} : {{ value }}</v-col
        >
      </v-row>
    </v-col>

    <v-col
      ><v-card rounded="lg" class="overflow-hidden pa-0" elevation="15">
        <client-only>
          <vue-web-cam
            id="webcam"
            width="auto"
            height="auto"
            ref="video"
            @error="onError"
            :selectFirstDevice="true"
          />
        </client-only>
        <canvas id="canvas" ref="canvas"></canvas> </v-card
    ></v-col>
  </v-row>
</template>

<script lang="ts">
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
//@ts-ignore
import * as fp from "fingerpose";
import { Vue, Component, Ref } from "nuxt-property-decorator";
import * as ap from "../../dist/index";


@Component({})
export default class Index extends Vue {
  poseData: Array<Array<string>> = [];
  bestMatch: any = {};

  private _interval!: NodeJS.Timer;
  public fingerJoints = {
    palm: [0, 1, 5, 9, 13, 17, 0],
    thumb: [1, 2, 3, 4],
    indexFinger: [5, 6, 7, 8],
    middleFinger: [9, 10, 11, 12],
    ringFinger: [13, 14, 15, 16],
    pinky: [17, 18, 19, 20],
  };

  mounted() {
    this.loadModel();
  }

  beforeDestroy() {
    clearInterval(this._interval);
  }
  public onError(e: any) {
    console.log({ e });
  }
  public async findHand(model: handpose.HandPose) {
    const video = document.querySelector("video");
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (video && video.readyState === 4) {
      const { videoHeight, videoWidth } = video;

      // set video width & height
      video.width = videoWidth;
      video.height = videoHeight;

      // set canvas width & height
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const predictions = await model.estimateHands(video,true);
      this.estimatGesture(predictions);
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drowHand(predictions, ctx);
    }
  }

  public async loadModel() {
    try {
      const model: handpose.HandPose = await handpose.load();
      setTimeout(() => {
        this._interval = setInterval(() => {
          this.findHand(model);
        }, 10);
      }, 500);
    } catch (error) {
      console.error({ error });
    }
  }

  public drowHand(
    predictions: handpose.AnnotatedPrediction[],
    ctx: CanvasRenderingContext2D
  ) {
    if (predictions.length > 0) {
      predictions.forEach((x) => {
        const landmarks = x.landmarks;

        for (let j = 0; j < Object.keys(this.fingerJoints).length; j++) {
          const finger = Object.keys(this.fingerJoints)[j];
          for (let k = 0; k < this.fingerJoints[finger].length - 1; k++) {
            const firstJointIndex = this.fingerJoints[finger][k];
            const secondJointIndex = this.fingerJoints[finger][k + 1];

            ctx.beginPath();
            ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
            );
            ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
            );
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }

        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0];
          const y = landmarks[i][1];
          const z = landmarks[i][2];
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        }
      });
    }
  }

  public estimatGesture(predictions: handpose.AnnotatedPrediction[]) {
    if (predictions.length > 0) {
      const GE = new fp.GestureEstimator([
        ap.Gestures.raisedHandGesture,
        ap.Gestures.fingerSplayedGesture,
        ap.Gestures.thumbsDownGesture,
        ap.Gestures.victoryGesture,
        ap.Gestures.thumbsUpGesture,
        ap.Gestures.pinchingGesture,
        ap.Gestures.okGesture,
        ap.Gestures.oncomingFistGesture,
        ap.Gestures.fistGesture,
      ]);
      const gestures = GE.estimate(predictions[0].landmarks, 8);
      this.poseData = gestures.poseData;
      if (gestures.gestures.length > 0) {
        this.bestMatch = ap.Utils.bestMatch(gestures.gestures);
      } else {
        this.bestMatch = {};
      }
    } else {
      this.poseData = [];
    }
  }
}
</script>

<style>
video{
   -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>