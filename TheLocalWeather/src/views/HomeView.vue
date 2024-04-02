<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxAPIKey =
  "pk.eyJ1Ijoic2FtOTAzMTUiLCJhIjoiY2x1ODFhN216MGNkcDJpbXNxbWh5b2NheCJ9.pXqt6S3NTxkfw3H0zuyBog";
const mapboxSearchResults = ref(null);
const searchError = ref(null);
const router = useRouter();

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    //延遲搜尋
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};

const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",", 2);
  console.log(city, state);
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1], //緯度
      lng: searchResult.geometry.coordinates[0], //經度
      preview: true,
    },
  });
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-2 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError == true">
          Sorry something went wrong,please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query,please try again.
        </p>
        <li
          v-else
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList/>
        <template #fallback>
             <p>Loading...</p> 
        </template>
      </Suspense>
    </div>
  </main>
</template>
