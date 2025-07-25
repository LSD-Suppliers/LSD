import joblib
import pandas

print("\nEnter the values for these criteria \nVerified | Company page | Connections | Completeness")
vals = input().split()
vals = [int(vals[0]), int(vals[1])] + list(map(float, vals[2:]))
feats = ["verification_status", "company_url_present", "connection_score", "profile_completeness"]
test_profile = pandas.DataFrame([vals], columns=feats)

model = joblib.load("model.joblib")
score = model.predict(test_profile)[0]
res = "Scam" if score > 0.60 else "Suspicious" if score > 0.40 else "Genuine"

print ("\nResult :", res)
print(f"Scam Likelihood : {round(score * 100, 2)}% \n")
