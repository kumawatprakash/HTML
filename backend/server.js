const express = require('express');
const app = express();
const port = 4444;

// Middleware to parse JSON request bodies
app.use(express.json());

// POST route to handle the location data
app.post('/log', (req, res) => {
  try {
    const { ip, ipLatitude, ipLongitude, gpsLatitude, gpsLongitude, city } = req.body;

    // Log the received data
    console.log('IP Address:', ip);
    console.log('IP-Based Latitude/Longitude:', ipLatitude, ipLongitude);
    console.log('City (IP-Based):', city || 'Not Provided');
    console.log('GPS-Based Latitude/Longitude:', gpsLatitude || 'Not Available', gpsLongitude || 'Not Available');

    // Respond with success
    res.status(200).json({
      message: 'Details logged successfully!',
      data: {
        ip,
        ipLatitude,
        ipLongitude,
        gpsLatitude: gpsLatitude || 'Not Available',
        gpsLongitude: gpsLongitude || 'Not Available',
        city: city || 'Not Provided',
      },
    });
  } catch (error) {
    console.error('Error logging details:', error);
    res.status(500).json({ message: 'Failed to log details', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
