# photoshare-frontend

## Steps To Setup
#### 1. Make sure you have Node.js 14.16.1 or newer installed.
Click [here](https://nodejs.org/en/) to download and install Node.js.
#### 2. Clone the project like so:
```bash
git clone https://github.com/likhity/photoshare-frontend.git
```
#### 3. `cd` into the newly created folder photoshare-frontend.
```bash
cd photoshare-frontend
```
#### 4. Run `npm install` to install all the packages.
```bash
npm install
```
This will install all of the project's dependencies and devDependencies defined in the file package.json.
#### 5. Launch the app and view it in the browser.
```bash
npm run dev
```
You should see an output similar to this in your terminal:
![React app launched in terminal](https://i.imgur.com/PWL1I0u.png)

Go to that url in your browser.

You should see a page like this:
![PhotoShare page](https://i.imgur.com/9xXWT0h.png)

## Connect With Backend

If it says "Loading current time...", it's probably because you didn't start the backend, so the frontend is not able to successfully make requests to the backend api.

In another terminal, go into your photoshare-backend project and start the backend server. Then, reload the page in your browser.
The app should successfully make a request to /api/time and display the current time like so:
![PhotoShare page backend succesfully running](https://i.imgur.com/Ud6NtZc.png)