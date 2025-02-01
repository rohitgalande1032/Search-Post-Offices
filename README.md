Deploy Link - https://rohit-search-post-offices.netlify.app/

Task: Retrieve and Display User Information Using IP Address

Step 1: Get User's IP Address
Reference - https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/

Step 2: Fetch User Information Using IP Address
Once you have the user's IP address, create an API request to https://ipapi.co/${IP}/json/, where ${IP} is the IP address of the user. Fetch the user information when a button is clicked.

Step 3: Display User's Location on Google Map
Using the latitude and longitude obtained from the API response in Step 2, display the user's location on a Google map. Refer the below StackOverflow post for guidance on how to embed a Google map with a marker.
https://stackoverflow.com/questions/33464192/display-an-embedded-google-map-iframe-with-a-marker-on-a-certain-latitude-and-longitude

Step 4: Display Current Time in User's Timezone
Using the timezone information obtained from the API response in Step 2, display the current time for the user's location
https://usefulangle.com/post/382/javascript-get-date-time-for-timezone

Step 5: Retrieve and Display Local Post Offices
Using the pincode from the API response in Step 2, send a GET request to https://api.postalpincode.in/pincode/${pincode}, where ${pincode} is the pincode obtained earlier. This will give you a list of post offices in that area. Display all the post offices available in that area.

Step 6: Add Search Functionality
Create a search box that allows users to filter the list of post offices by name and branch office.
