import moment from "moment";
import { enqueueSnackbar } from "notistack";

export const getBgColor = () => {
  const bgarr = [
    "color1",
    "color2",
    "color3",
    "color4",
    "color5",
    "color6",
    "color7",
    "color8",
    "color9",
    "color10",
  ];
  const randomBg = Math.floor(Math.random() * bgarr.length);
  const color = bgarr[randomBg];
  return color;
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const fetchDateTime = (newDate) => {
  return moment(newDate).format("lll"); // December 2, 2025 3:45 PM
};


export function messageEnqueue(data, status) {
  const playSound = (soundFile) => {
  const audio = new Audio(`/sounds/${soundFile}`);
  audio.play();
  };

  if (status == "success") {
    playSound("success.mp3");
    enqueueSnackbar(data.message, { variant: "success" });
  } else {
    playSound("error.mp3");
    enqueueSnackbar(data.message, { variant: "error" });
  }

    // enqueueSnackbar(data.message, { variant: `${status}` }); // that's better 
}
