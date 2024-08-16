export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`  // reverse geocoding ---is like getting some information based on the position of the location (latitude and longitude)
  ); 
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
