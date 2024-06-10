const downloadImg = async (req, res) => {
    const targetUrl = req.query.url;
  
    if (!targetUrl) {
      res.status(400).send('Missing url parameter');
      return;
    }
  
    try {
      const response = await axios.get(targetUrl, {
        responseType: 'arraybuffer', // This is important
        headers: {
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
        },
      });
  
      res.set({
        'Content-Type': response.headers['content-type'],
        'Content-Length': response.headers['content-length'],
      });
  
      res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
      console.error(`HTTP error! status: ${error.response.status}`);
      res.status(500).send('Error fetching image');
    }
  }

    module.exports = downloadImg;