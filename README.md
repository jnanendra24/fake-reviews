# Fake Reviews

DATASETS
[kaggle](https://www.kaggle.com/datasets/mexwell/fake-reviews-dataset "kaggle")

1. clone this repo
2. cd `fake-reviews`
3. **OPTIONAL:** well, I recommend creating a virtual environment for python, the easiest way possible is to use [uv docs](https://pypi.org/project/uv/ "uv docs"). you can skip this otherwise.
4. `pip install poetry`
5. `cd fake-reviews-app`
6. `poetry install`
7. `cd fake_reviews_app`
8. `poetry run python app.py` this will run flask server on http://127.0.0.1:5000
9. Now for frontend open new terminal
10. `cd ./fake-reviews-react/`
11. `npm install`
12. `npm run dev`
13. Goto http://localhost:5173

For Frontend we have used [shadcn/ui](https://ui.shadcn.com/ "shadcn/ui") Library. Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source. You can check this out!
