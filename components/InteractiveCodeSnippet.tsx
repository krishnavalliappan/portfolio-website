// components/InteractiveCodeSnippet.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const snippets = [
  {
    code: `import pandas as pd
import matplotlib.pyplot as plt

# Load data
data = pd.read_csv('sales_data.csv')

# Group by month and calculate total sales
monthly_sales = data.groupby('month')['sales'].sum()

# Create bar plot
plt.figure(figsize=(10, 6))
monthly_sales.plot(kind='bar')
plt.title('Monthly Sales')
plt.xlabel('Month')
plt.ylabel('Total Sales')
plt.show()`,
    description: 'Visualizing monthly sales data with pandas and matplotlib'
  },
  {
    code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Generate sample data
X = np.random.rand(100, 1)
y = 2 + 3 * X + np.random.randn(100, 1)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean squared error: {mse}")
print(f"R-squared score: {r2}")`,
    description: 'Simple linear regression with scikit-learn'
  },
  {
    code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the iris dataset
iris = sns.load_dataset('iris')

# Create a pair plot
sns.pairplot(iris, hue='species')
plt.suptitle('Iris Dataset - Pair Plot', y=1.02)
plt.show()`,
    description: 'Exploratory data analysis with seaborn'
  }
];

const InteractiveCodeSnippet: React.FC = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);

  const nextSnippet = () => {
    setCurrentSnippet((prev) => (prev + 1) % snippets.length);
  };

  return (
    <motion.div
      className="bg-card text-card-foreground p-4 rounded-lg shadow-lg max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2">{snippets[currentSnippet].description}</h3>
      <SyntaxHighlighter 
        language="python" 
        style={vscDarkPlus}
        className="rounded-md text-sm"
      >
        {snippets[currentSnippet].code}
      </SyntaxHighlighter>
      <button 
        onClick={nextSnippet}
        className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80 transition-colors"
      >
        Next Snippet
      </button>
    </motion.div>
  );
};

export default InteractiveCodeSnippet;
