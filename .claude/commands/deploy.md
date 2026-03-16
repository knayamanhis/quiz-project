Deploy the latest changes to the Basecamp Coffee quiz on Vercel.

Steps:
1. Run `git status` to show the user what files have changed
2. Ask the user to confirm the commit message, or suggest one based on the changes
3. Stage all changed files: `git add .`
4. Commit with the confirmed message
5. Push to GitHub: `git push`
6. Vercel will auto-deploy from the GitHub push — no manual Vercel command needed

After pushing:
- Tell the user the live URL: https://quiz-project-indol-six.vercel.app
- Let them know Vercel typically takes 30–60 seconds to deploy
- Remind them they can check deployment status at vercel.com/knayamanhis-projects/quiz-project

Note: If Vercel auto-deploy is not connected, fall back to: `vercel --prod --yes` from the quiz-project folder.
