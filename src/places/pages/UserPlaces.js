import React from "react";
import PlaceList from "../components/PlaceList";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40.7484405, lng: -73.9878584 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "This is the place description",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNVlM5lo7fIJrmvjN4EOrTMiQjDgDyTfw7ATdV6=s680-w680-h510",
    address: "20 W 34th St, New York, NY 10001",
    location: { lat: 40, lng: -73 },
    creator: "u2",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((places) => places.creator === userId);
  return (
    <Grid container>
      <PlaceList items={loadedPlaces} />
    </Grid>
  );
};

export default UserPlaces;
