# 🚀 Deployment Guide

This guide will help you deploy my BFHL API to various hosting platforms. I've tested these deployment methods and they work reliably.

## 📋 Prerequisites

1. **GitHub Repository**: Push your code to a public GitHub repository
2. **Node.js**: Ensure your project runs locally with `npm start`
3. **Tests Passing**: Run `npm test` to ensure all tests pass

## 🎯 Quick Deployment Options

### Option 1: Vercel (Recommended - Fastest)

I recommend Vercel because it's the fastest and most reliable option I've tested:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project: `N`
   - Project name: `bfhl-api` (or your preferred name)
   - Directory: `.` (current directory)
   - Override settings: `N`

4. **Your API will be live at**: `https://your-project-name.vercel.app`

### Option 2: Railway

1. **Visit** [railway.app](https://railway.app)
2. **Sign in** with GitHub
3. **Create New Project** → Deploy from GitHub repo
4. **Select your repository**
5. **Railway will auto-deploy** your API
6. **Get your URL** from the project dashboard

### Option 3: Render

1. **Visit** [render.com](https://render.com)
2. **Sign in** with GitHub
3. **New Web Service** → Connect your repository
4. **Configure**:
   - Name: `bfhl-api`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Deploy** and get your URL

### Option 4: Heroku

1. **Install Heroku CLI**
   ```bash
   # Windows
   https://devcenter.heroku.com/articles/heroku-cli
   
   # macOS
   brew tap heroku/brew && brew install heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Your API will be live at**: `https://your-app-name.herokuapp.com`

## 🔧 Configuration

### Environment Variables

Most platforms will automatically detect Node.js apps, but you can set:

```bash
NODE_ENV=production
PORT=3000
```

### Custom Domain (Optional)

After deployment, you can add a custom domain in your hosting platform's dashboard.

## ✅ Verification

After deployment, test your API:

1. **Health Check**: `GET https://your-url/health`
2. **Main Endpoint**: `POST https://your-url/bfhl`

### Test with Example A:
```bash
curl -X POST https://your-url/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

Expected response:
```json
{
  "is_success": true,
  "user_id": "john_doe_17122023",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check `package.json` has correct scripts
   - Ensure all dependencies are in `dependencies` (not `devDependencies`)

2. **Runtime Errors**
   - Check logs in your hosting platform
   - Verify environment variables are set correctly

3. **API Not Responding**
   - Check if the service is running
   - Verify the correct port is exposed

### Debug Commands

```bash
# Check if app runs locally
npm start

# Run tests
npm test

# Check dependencies
npm list --depth=0
```

## 📱 Mobile Testing

Test your API with mobile apps like:
- **Postman**
- **Insomnia**
- **cURL** (terminal)

## 🔒 Security Notes

- Your API includes rate limiting (100 requests per 15 minutes per IP)
- CORS is enabled for cross-origin requests
- Security headers are set with Helmet

## 📊 Monitoring

Most platforms provide:
- **Logs**: View real-time application logs
- **Metrics**: CPU, memory, response time
- **Alerts**: Set up notifications for errors

## 🎉 Success!

Once deployed, your API endpoint will be:
```
https://your-url/bfhl
```

**Submit this URL** to the assignment form: https://forms.office.com/r/ZeVpUYp3zV

I've made sure the deployment process is straightforward and reliable!

## 🆘 Need Help?

1. Check the platform's documentation
2. Review error logs
3. Test locally first
4. Ensure all tests pass before deployment

**Good luck with your assignment! 🚀**
