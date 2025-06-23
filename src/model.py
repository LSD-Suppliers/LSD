import pandas
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import joblib

data = pandas.read_csv("data.csv")

X = data.drop(columns=["scamminess_score"])
Y = data["scamminess_score"]
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=69)

model = RandomForestRegressor(random_state=69)
model.fit(X_train, Y_train)
print ("Model successfully trained.. Yay!")

Y_pred = model.predict(X_test)
accuracy = r2_score(Y_test, Y_pred)
print(f"Accuracy of the model: {accuracy*100 : .2f}%")

joblib.dump(model, "model.joblib")
