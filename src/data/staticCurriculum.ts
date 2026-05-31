import { ModuleNode, ProjectItem, ResourceItem, AchievementBadge } from '../types';

export const STATIC_MODULES: ModuleNode[] = [
  {
    id: '00-prerequisites',
    name: 'Foundation Prerequisites & Math',
    path: '00-prerequisites',
    difficulty: 'beginner',
    durationHours: 6,
    sequence: 0,
    description: 'Set up your system environment and brush up on essential linear algebra, calculus, and basic machine learning notations.',
    prerequisites: [],
    learningObjectives: [
      'Understand scalars, vectors, matrices, and tensor notations',
      'Master matrix multiplication, dimensions, and matrix transpose',
      'Understand derivatives, gradients, and partial derivatives for optimization',
      'Set up Git, Conda, Jupyter Notebook, and PIP environments'
    ],
    keyTakeaways: [
      'Linear algebra is the language of data and parameter representations in ML.',
      'Calculus is used by training algorithms to calculate error gradients and update weights.',
      'A clean virtual environment prevents package version conflicts in your notebooks.'
    ],
    files: [
      { name: 'README.md', path: '00-prerequisites/README.md', type: 'file' }
    ]
  },
  {
    id: '01-python-for-data-science',
    name: 'Python for Data Science',
    path: '01-python-for-data-science',
    difficulty: 'beginner',
    durationHours: 12,
    sequence: 1,
    description: 'Master core scientific computing libraries in Python including NumPy, Pandas, and Matplotlib/Seaborn for manipulation and exploration.',
    prerequisites: ['00-prerequisites'],
    learningObjectives: [
      'Learn NumPy vectorization and advanced array slicing operations',
      'Master Pandas DataFrames, handling missing values, and group-by aggregations',
      'Build aesthetic custom visualizations using Matplotlib and Seaborn',
      'Analyze data distributions, correlation metrics, and outline outlier boundaries'
    ],
    keyTakeaways: [
      'NumPy arrays use optimized C-memory buffers, making vector operations 100x faster than raw loops.',
      'Pandas acts as an in-memory SQL spreadsheet, enabling rapid data cleaning.',
      'Seaborn provides high-level abstractions to construct statistical plots effortlessly.'
    ],
    files: [
      { name: 'README.md', path: '01-python-for-data-science/README.md', type: 'file' }
    ]
  },
  {
    id: '02-introduction-to-ml',
    name: 'Introduction to Machine Learning',
    path: '02-introduction-to-ml',
    difficulty: 'beginner',
    durationHours: 8,
    sequence: 2,
    description: 'Understand the fundamental classification of learning paradigms, features vs labels, train-test splits, and baseline models.',
    prerequisites: ['01-python-for-data-science'],
    learningObjectives: [
      'Differentiate between Supervised, Unsupervised, and Reinforcement Learning',
      'Formulate datasets into feature matrices (X) and label vectors (y)',
      'Establish robust model baselines and avoid the pitfall of data leakage',
      'Implement simple K-Nearest Neighbors and Decision Tree baselines'
    ],
    keyTakeaways: [
      'Supervised models learn from labeled targets, while unsupervised models explore unlabeled densities.',
      'Data leakage occurs when target information from the test split slips into model training.',
      'Establishing a simple baseline helps measure the value added by complex models.'
    ],
    files: [
      { name: 'README.md', path: '02-introduction-to-ml/README.md', type: 'file' }
    ]
  },
  {
    id: '03-supervised-learning-regression',
    name: 'Supervised Learning: Regression',
    path: '03-supervised-learning-regression',
    difficulty: 'beginner',
    durationHours: 10,
    sequence: 3,
    description: 'Deep dive into continuous estimations using Linear Regression, Gradient Descent optimizers, and regularization penalties (Ridge, Lasso).',
    prerequisites: ['02-introduction-to-ml'],
    learningObjectives: [
      'Deconstruct the Ordinary Least Squares (OLS) closed-form solution',
      'Implement batch, stochastic, and mini-batch gradient descent algorithms',
      'Combat overfitting using Ridge (L2) and Lasso (L1) weight regularization',
      'Evaluate regressions with Mean Squared Error (MSE), RMSE, MAE, and R-squared'
    ],
    keyTakeaways: [
      'Ridge regularization shrinks model parameters, Lasso zeros out redundant features.',
      'Gradient Descent updates weights in the negative gradient direction to find local minima.',
      'R-squared measures the proportion of variance explained by the explanatory variables.'
    ],
    files: [
      { name: 'README.md', path: '03-supervised-learning-regression/README.md', type: 'file' }
    ]
  },
  {
    id: '04-supervised-learning-classification',
    name: 'Supervised Learning: Classification',
    path: '04-supervised-learning-classification',
    difficulty: 'beginner',
    durationHours: 10,
    sequence: 4,
    description: 'Implement classifiers including Logistic Regression, Support Vector Machines (SVM), and Decision Trees. Manage decision thresholds.',
    prerequisites: ['02-introduction-to-ml'],
    learningObjectives: [
      'Express the Logistic (sigmoid) function and deconstruct Binary Cross-Entropy loss',
      'Optimize Support Vector Machines with kernels for complex non-linear classification boundaries',
      'Deconstruct Tree-splitting criteria like Gini Impurity and Shannon Entropy',
      'Utilize Precision, Recall, F1-score, and ROC-AUC curves for validation'
    ],
    keyTakeaways: [
      'Sigmoid maps real numbers to probabilities between zero and one.',
      'SVMs find the maximum margin hyperplane separating classes, relying on kernel ticks for dimensions.',
      'The decision threshold can be shifted to trade off false positives against false negatives.'
    ],
    files: [
      { name: 'README.md', path: '04-supervised-learning-classification/README.md', type: 'file' }
    ]
  },
  {
    id: '05-model-evaluation-optimization',
    name: 'Model Evaluation & Optimization',
    path: '05-model-evaluation-optimization',
    difficulty: 'intermediate',
    durationHours: 10,
    sequence: 5,
    description: 'Build reliable validation pipelines. Master Cross-Validation, Tuning (Grid/Random Search), and diagnosis of Bias vs Variance issues.',
    prerequisites: ['03-supervised-learning-regression', '04-supervised-learning-classification'],
    learningObjectives: [
      'Execute robust K-Fold and Stratified Cross-Validation folds',
      'Diagnose Underfitting vs Overfitting through learning and validation curves',
      'Configure Hyperparameter tuning strategies (GridSearch vs RandomizedSearch)',
      'Analyze the fundamental mathematical trade-off between Bias and Variance error'
    ],
    keyTakeaways: [
      'Stratified splits ensure class distribution remains consistent across validation folds.',
      'High Bias represents model underfitting, whereas High Variance represents model overfitting.',
      'Randomized Search is more efficient than Grid Search when tuning high-dimensional parameters.'
    ],
    files: [
      { name: 'README.md', path: '05-model-evaluation-optimization/README.md', type: 'file' }
    ]
  },
  {
    id: '06-ensemble-methods',
    name: 'Ensemble Methods & Boosting',
    path: '06-ensemble-methods',
    difficulty: 'intermediate',
    durationHours: 12,
    sequence: 6,
    description: 'Harness the combined power of diverse trees via Random Forests, Bagging, Gradient Boosting, XGBoost, and LightGBM.',
    prerequisites: ['05-model-evaluation-optimization'],
    learningObjectives: [
      'Explain Bootstrap Aggregating (Bagging) and understand out-of-bag error estimates',
      'Implement Random Forests and measure Gini feature importances',
      'Apply Gradient Boosting optimization on consecutive pseudo-residuals',
      'Optimize modeling pipelines using production XGBoost, LightGBM, and CatBoost libraries'
    ],
    keyTakeaways: [
      'Random Forest is a bagging ensemble that de-correlates trees by selecting random subsets of features.',
      'Boosting works sequentially, fitting new models to correct the residual errors of prior steps.',
      'XGBoost incorporates pre-compiled regularized objectives, mitigating overfit trends.'
    ],
    files: [
      { name: 'README.md', path: '06-ensemble-methods/README.md', type: 'file' }
    ]
  },
  {
    id: '07-feature-engineering',
    name: 'Feature Engineering & Selection',
    path: '07-feature-engineering',
    difficulty: 'intermediate',
    durationHours: 8,
    sequence: 7,
    description: 'Learn transformations like Encoding, Scaling, Dimensionality Reduction (PCA), and mathematical feature selection techniques.',
    prerequisites: ['01-python-for-data-science'],
    learningObjectives: [
      'Execute Standard, MinMax, and Robust Scaling transformations',
      'Implement One-Hot, Ordinal, Target, and Frequency categorical encoding strategies',
      'Leverage Principal Component Analysis (PCA) for lower-dimension representations',
      'Execute filter, wrapper, and embedded feature selection algorithms'
    ],
    keyTakeaways: [
      'Distance-style models like SVM/KNN are sensitive to scaling, while tree-based models ignore scale.',
      'PCA maximizes variance along orthogonal axes (Principal Components) to reduce columns.',
      'Robust Scaling handles outliers elegantly by using the Median and Interquartile range.'
    ],
    files: [
      { name: 'README.md', path: '07-feature-engineering/README.md', type: 'file' }
    ]
  },
  {
    id: '08-unsupervised-learning',
    name: 'Unsupervised Learning',
    path: '08-unsupervised-learning',
    difficulty: 'intermediate',
    durationHours: 10,
    sequence: 8,
    description: 'Explore dataset structures without labels using K-Means, Hierarchical Clustering, DBSCAN, and Dimensionality Reduction (t-SNE).',
    prerequisites: ['07-feature-engineering'],
    learningObjectives: [
      'Implement K-Means clustering and select optimal seeds using the Elbow or Silhouette method',
      'Deploy DBSCAN density clustering to discover arbitrary geographic cluster geometries',
      'Deconstruct Agglomerative Hierarchical clustering and analyze Dendrogram branches',
      'Verify results using t-SNE and UMAP manifold visualization techniques'
    ],
    keyTakeaways: [
      'K-Means assumes spherical clusters and equal cluster sizes, while DBSCAN acts on density.',
      't-SNE is well-suited for embedding high-dimensional spaces into 2D plots for visualization.',
      'Silhouette analysis gauges cluster proximity and overlap boundaries.'
    ],
    files: [
      { name: 'README.md', path: '08-unsupervised-learning/README.md', type: 'file' }
    ]
  },
  {
    id: '09-neural-networks-basics',
    name: 'Neural Networks Basics',
    path: '09-neural-networks-basics',
    difficulty: 'intermediate',
    durationHours: 12,
    sequence: 9,
    description: 'Explore biological analogies. Learn Artificial Neurons, Multilayer Perceptrons (MLPs), Forward/Backward pass, and Activation functions.',
    prerequisites: ['00-prerequisites', '05-model-evaluation-optimization'],
    learningObjectives: [
      'Deconstruct Multi-Layer Perceptron (MLP) architectures',
      'Implement the Backpropagation algorithm manually using calculus chain-rules',
      'Contrast ReLU, Sigmoid, Tanh, and Softmax activation functions',
      'Handle Vanishing/Exploding gradient boundaries in deeply layered neural networks'
    ],
    keyTakeaways: [
      'Activation functions introduce non-linearity, allowing networks to learn complex manifold shapes.',
      'Backpropagation works recursively from output to input sharing global loss gradients.',
      'ReLU helps solve vanishing gradients by maintaining a constant slope of one for positive inputs.'
    ],
    files: [
      { name: 'README.md', path: '09-neural-networks-basics/README.md', type: 'file' }
    ]
  },
  {
    id: '10-deep-learning-frameworks',
    name: 'Deep Learning Frameworks & PyTorch',
    path: '10-deep-learning-frameworks',
    difficulty: 'intermediate',
    durationHours: 10,
    sequence: 10,
    description: 'Master PyTorch. Write Datasets, DataLoaders, model definitions, training loops, forward passes, and custom loss functions.',
    prerequisites: ['09-neural-networks-basics'],
    learningObjectives: [
      'Build PyTorch tensors and explore auto-differentiation graph traces',
      'Construct Custom subclasses of torch.utils.data.Dataset and DataLoader classes',
      'Write highly organized stateful training and evaluation loops in raw PyTorch',
      'Utilize hardware accelerators like CUDA, ROCm, or Apple Silicon MPS tensors'
    ],
    keyTakeaways: [
      'PyTorch builds dynamic computational graphs on-the-fly during forward passes.',
      'DataLoader supports parallel worker processes to feed datasets asynchronously to VRAM.',
      'Calling optimizer.zero_grad() prevents accumulating gradient additions between training steps.'
    ],
    files: [
      { name: 'README.md', path: '10-deep-learning-frameworks/README.md', type: 'file' }
    ]
  },
  {
    id: '11-computer-vision',
    name: 'Computer Vision & CNNs',
    path: '11-computer-vision',
    difficulty: 'advanced',
    durationHours: 14,
    sequence: 11,
    description: 'Master image analysis using Convolutional Neural Networks, Max Pooling, Spatial awareness, and modern Object Detection architectures.',
    prerequisites: ['10-deep-learning-frameworks'],
    learningObjectives: [
      'Inspect 2D Convolution mathematical filters, stride intervals, and padding values',
      'Build deep CNN architectures including AlexNet, ResNet, and ConvNeXt from scratch',
      'Analyze Object Detection pipelines (Single Shot Detectors vs YOLO models)',
      'Deploy pretrained CNN models for image feature extraction and transfer learning tasks'
    ],
    keyTakeaways: [
      'Convolutions reuse model parameters across spatial areas, maintaining spatial translation invariance.',
      'Residual skip connections solve vanishing gradients by offering weight bypassing shortcuts.',
      'Transfer learning saves computational resources by leveraging pre-trained weights.'
    ],
    files: [
      { name: 'README.md', path: '11-computer-vision/README.md', type: 'file' }
    ]
  },
  {
    id: '12-natural-language-processing',
    name: 'Natural Language Processing & Transformers',
    path: '12-natural-language-processing',
    difficulty: 'advanced',
    durationHours: 15,
    sequence: 12,
    description: 'Learn text processing from Bag-of-Words to Recurrent Networks, LSTMs, Attention mechanisms, and modern Transformers.',
    prerequisites: ['10-deep-learning-frameworks'],
    learningObjectives: [
      'Perform text preprocessing, token encoding, and work with word vector embeddings',
      'Contrast standard Recurrent Neural Networks (RNNs) with Long Short-Term Memory (LSTM) cells',
      'Implement the scaled Dot-Product Self-Attention mechanism mathematically',
      'Deconstruct the standard Transformer Encoder-Decoder architecture (BERT, GPT)'
    ],
    keyTakeaways: [
      'Standard RNNs suffer from bad short-term memory memory fading while backpropagating.',
      'Self-attention calculates pairwise token relationships, bypassing sequential processing limits.',
      'Word embeddings map semantic representations into high-dimensional vector spaces.'
    ],
    files: [
      { name: 'README.md', path: '12-natural-language-processing/README.md', type: 'file' }
    ]
  },
  {
    id: '13-model-deployment',
    name: 'Model Deployment & APIs',
    path: '13-model-deployment',
    difficulty: 'intermediate',
    durationHours: 10,
    sequence: 13,
    description: 'Package trained models as REST APIs using FastAPI/Flask, utilize Docker containers, and build quick interactive frontends with Streamlit.',
    prerequisites: ['05-model-evaluation-optimization'],
    learningObjectives: [
      'Serialize machine learning estimators using joblib or ONNX standard formats',
      'Create high-performance prediction service servers using FastAPI',
      'Containerize application runtimes using Dockerfiles and compose manifests',
      'Build rapid responsive interactive UI dashboards using Streamlit or Gradio'
    ],
    keyTakeaways: [
      'Serializing estimators records the exact internal state, weights, and structure of models.',
      'FastAPI relies on Pydantic to ensure input types are validated before reaching endpoints.',
      'Docker containers bundle all software dependencies, ensuring uniform performance.'
    ],
    files: [
      { name: 'README.md', path: '13-model-deployment/README.md', type: 'file' }
    ]
  },
  {
    id: '14-mlops-basics',
    name: 'MLOps Basics & Monitoring',
    path: '14-mlops-basics',
    difficulty: 'advanced',
    durationHours: 12,
    sequence: 14,
    description: 'Adopt continuous workflows. Implement model tracking with MLflow/Weights & Biases, pipeline steps, and monitor for concept drift.',
    prerequisites: ['13-model-deployment'],
    learningObjectives: [
      'Track training runs, hyperparameters, and resulting charts using MLflow',
      'Design reliable version-controlled datasets and feature store tables',
      'Detect concept and data drift trends in live production databases',
      'Build automated CI/CD pipelines to trigger training exercises on new tags'
    ],
    keyTakeaways: [
      'Data drift occurs when incoming data patterns change compared to training distributions.',
      'MLflow registers multiple candidate versions of weights, supporting direct comparative metrics.',
      'Model monitors guard against silent performance decay in active products.'
    ],
    files: [
      { name: 'README.md', path: '14-mlops-basics/README.md', type: 'file' }
    ]
  },
  {
    id: '15-time-series-analysis',
    name: 'Time Series Analysis',
    path: '15-time-series-analysis',
    difficulty: 'intermediate',
    durationHours: 8,
    sequence: 15,
    description: 'Model temporal data. Deconstruct Trends, Seasonality, ARIMA forecasting equations, Prophet, and sequential deep learning.',
    prerequisites: ['03-supervised-learning-regression'],
    learningObjectives: [
      'Deconstruct time-series components into Trend, Seasonality, and Cyclical elements',
      'Configure Autoregressive Integrated Moving Average (ARIMA & SARIMAX) settings',
      'Train Facebook Prophet and NeuralProphet models on cyclical calendars',
      'Apply sequential validation windows to avoid test fold leaks from future dates'
    ],
    keyTakeaways: [
      'Time series forecasting assumes consecutive observations are highly correlated (autocorrelation).',
      'Decomposition separates signals into additive or multiplicative components.',
      'Cross-validation in time-series must respect chronological order, using sliding windows.'
    ],
    files: [
      { name: 'README.md', path: '15-time-series-analysis/README.md', type: 'file' }
    ]
  },
  {
    id: '19-sql-database-fundamentals',
    name: 'SQL & Database Fundamentals',
    path: '19-sql-database-fundamentals',
    difficulty: 'beginner',
    durationHours: 6,
    sequence: 16,
    description: 'Query, clean, aggregate, and select records from relational databases for machine learning training pipelines.',
    prerequisites: [],
    learningObjectives: [
      'Formulate analytical queries using JOINs, window functions, and subqueries',
      'Construct efficient indexes to speed up table scans during model feature fetches',
      'Implement partitions, schemas, and schemas for relational databases',
      'Execute bulk load commands to inject high volumes of structured data rows'
    ],
    keyTakeaways: [
      'Relational tables store values in columns and rows, utilizing strict schemas.',
      'SQL joins combine records from multiple entities based on matching columns.',
      'Indexes improve read speed but slow down write operations.'
    ],
    files: [
      { name: 'README.md', path: '19-sql-database-fundamentals/README.md', type: 'file' }
    ]
  },
  {
    id: '20-handling-imbalanced-data',
    name: 'Handling Imbalanced Data',
    path: '20-handling-imbalanced-data',
    difficulty: 'intermediate',
    durationHours: 8,
    sequence: 17,
    description: 'Solve extreme class imbalances utilizing SMOTE, ADASYN, focal loss functions, and specialized scoring rules.',
    prerequisites: ['04-supervised-learning-classification'],
    learningObjectives: [
      'Deploy Synthetic Minority Over-sampling Technique (SMOTE) algorithms',
      'Implement cost-sensitive classification weights across gradient passes',
      'Configure customized F-beta indicators to focus on specific precision bounds',
      'Train models with focal losses to prioritize learning difficult margins'
    ],
    keyTakeaways: [
      'Over-sampling creates synthetic points, while down-sampling discards raw data.',
      'SMOTE interpolates minority points along lines connecting nearest neighbors.',
      'F1-score represents the harmonic mean, balancing precision and recall values.'
    ],
    files: [
      { name: 'README.md', path: '20-handling-imbalanced-data/README.md', type: 'file' }
    ]
  },
  {
    id: '21-model-explainability',
    name: 'Model Explainability & XAI',
    path: '21-model-explainability',
    difficulty: 'advanced',
    durationHours: 10,
    sequence: 18,
    description: 'Deconstruct model decisions. Master SHAP values, LIME local surrogates, and global permutation importances.',
    prerequisites: ['06-ensemble-methods'],
    learningObjectives: [
      'Deconstruct Shapley additive explanations (SHAP) and calculate individual contributions',
      'Build Local Interpretable Model-agnostic Explanations (LIME) around local predictions',
      'Analyze classic global feature permutations and partial dependence plots',
      'Debug models by exploring outlier samples with conflicting attribution signs'
    ],
    keyTakeaways: [
      'SHAP values are rooted in coalitional game theory, ensuring fair credit distribution.',
      'LIME fits a simple surrogate linear model around target decision neighborhoods.',
      'Explainability is critical to satisfy legal compliance rules in ethical AI systems.'
    ],
    files: [
      { name: 'README.md', path: '21-model-explainability/README.md', type: 'file' }
    ]
  },
  {
    id: '22-reinforcement-learning',
    name: 'Reinforcement Learning',
    path: '22-reinforcement-learning',
    difficulty: 'advanced',
    durationHours: 12,
    sequence: 19,
    description: 'Model agent decisions using Markov Decision Processes, Q-Learning, Deep Q-Networks (DQN), and Policy Gradient variations.',
    prerequisites: ['10-deep-learning-frameworks'],
    learningObjectives: [
      'Deconstruct Markov Decision Processes using rewards and discount configurations',
      'Train classical tabular Q-learning matrices over grid environments',
      'Build deep Q-learning networks (DQN) with experience replay pools',
      'Optimize actions with advanced Policy Gradient and Actor-Critic models'
    ],
    keyTakeaways: [
      'RL agents learn optimal behaviors by interacting with environments to maximize cumulative rewards.',
      'Experience replay de-correlates successive states, stabilizing parameter updates.',
      'The credit assignment problem addresses which exact action triggered an ultimate score.'
    ],
    files: [
      { name: 'README.md', path: '22-reinforcement-learning/README.md', type: 'file' }
    ]
  },
  {
    id: '23-graph-neural-networks',
    name: 'Graph Neural Networks (GNN)',
    path: '23-graph-neural-networks',
    difficulty: 'advanced',
    durationHours: 12,
    sequence: 20,
    description: 'Represent topological networks. Master GCNs, GATs, message passing logic, and deep relational databases.',
    prerequisites: ['10-deep-learning-frameworks'],
    learningObjectives: [
      'Encode graph entities into adjacency matrices and node feature vectors',
      'Implement the message-passing and node neighborhood aggregation equations',
      'Build Graph Convolutional Networks (GCN) and Graph Attention Networks (GAT)',
      'Classify entire charts, specific nodes, or potential link edges'
    ],
    keyTakeaways: [
      'GNNs work directly on non-Euclidean geometries like networks and molecules.',
      'Message passing collects signals from adjacent neighbors over multiple hops.',
      'Graph attention learns dynamic weightings for different node connection edges.'
    ],
    files: [
      { name: 'README.md', path: '23-graph-neural-networks/README.md', type: 'file' }
    ]
  },
  {
    id: '24-audio-speech-processing',
    name: 'Audio & Speech Processing',
    path: '24-audio-speech-processing',
    difficulty: 'advanced',
    durationHours: 10,
    sequence: 21,
    description: 'Transform waveform signals. Master spectrograms, MFCC feature extraction, and modern Automatic Speech Recognition (ASR) pipelines.',
    prerequisites: ['11-computer-vision'],
    learningObjectives: [
      'Convert raw audio waveforms into mel-spectrogram matrices',
      'Extract Mel-Frequency Cepstral Coefficients (MFCC) from voice clips',
      'Train Automatic Speech Recognition (ASR) pipelines using CTC loss formulas',
      'Finetune Whisper models on custom local dialect audio datasets'
    ],
    keyTakeaways: [
      'MFCCs model the logarithmic human perception of hearing and pitch distributions.',
      'Spectrograms convert sequential time waves into spatial frequency images.',
      'Connectionist Temporal Classification (CTC) aligns variable-length signals with text.'
    ],
    files: [
      { name: 'README.md', path: '24-audio-speech-processing/README.md', type: 'file' }
    ]
  },
  {
    id: '25-generative-ai-llms',
    name: 'Generative AI & LLMs',
    path: '25-generative-ai-llms',
    difficulty: 'advanced',
    durationHours: 14,
    sequence: 22,
    description: 'Finetune massive Large Language Models using LoRA, configure Retrieval Augmented Generation (RAG) indices, and deploy AI agents.',
    prerequisites: ['12-natural-language-processing'],
    learningObjectives: [
      'Deploy and query model checkpoints via server environments',
      'Master parameter efficient finetuning techniques (PEFT) like LoRA and QLoRA',
      'Build clean semantic indexes using vector datastores for RAG search expansions',
      'Configure AI agent execution chains using LangChain or LlamaIndex frameworks'
    ],
    keyTakeaways: [
      'LoRA freezes pre-trained weight columns, training small adapter parameters instead.',
      'RAG augments prompts with documents fetched from vector databases to reduce hallucinations.',
      'QLoRA quantizes primary network weights to 4-bit, shrinking active memory footprints.'
    ],
    files: [
      { name: 'README.md', path: '25-generative-ai-llms/README.md', type: 'file' }
    ]
  }
];

export const STATIC_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-titanic',
    title: 'Surviving the Titanic: Core Classification Binary Baseline',
    modulePath: '04-supervised-learning-classification',
    description: 'Build your first classification model! Clean biological age, fill boarding gateways, extract titles, and train a custom parameter logistic regression or SVM to predict surviving travelers.',
    skillsLearned: ['Data Cleaning', 'Feature Engineering', 'Binary Classification', 'Evaluation Metrics'],
    technologies: ['Python', 'Pandas', 'scikit-learn', 'Seaborn'],
    difficulty: 'beginner',
    estimatedTime: '4 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/16-projects-beginner',
    outcomes: [
      'Deploy cross-validated predictive classifiers',
      'Optimize classification thresholds using precision-recall contours',
      'Plot confusion matrices and construct structured classification reports'
    ]
  },
  {
    id: 'proj-house-prices',
    title: 'House Price Estimation and Ridge/Lasso Regularization',
    modulePath: '03-supervised-learning-regression',
    description: 'Analyze residential sales files. Correct skewness distributions with log transforms, one-hot encode categorical layouts, and apply L1/L2 penalties to prevent overfitting.',
    skillsLearned: ['Continuous Regression', 'Regularization (L1/L2)', 'Log Transformations', 'Hyperparameter Search'],
    technologies: ['Python', 'NumPy', 'Pandas', 'scikit-learn'],
    difficulty: 'beginner',
    estimatedTime: '5 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/16-projects-beginner',
    outcomes: [
      'Demonstrate the optimization of parameters using cross-validated alpha loops',
      'Formulate clean regression residual scatterplots to diagnose modeling blindspots',
      'Evaluate results with rigorous Root Mean Squared Error (RMSE) constraints'
    ]
  },
  {
    id: 'proj-credit-fraud',
    title: 'Credit Card Fraud Isolation & Imbalance Compensation',
    modulePath: '20-handling-imbalanced-data',
    description: 'Construct fraud detours over millions of anonymous transaction records. Solve severe imbalanced distributions using synthetic balancing (SMOTE) and specialized neural networks.',
    skillsLearned: ['SMOTE Over-sampling', 'Cost-Sensitive Learning', 'Precision-Recall AUC Tuning'],
    technologies: ['Python', 'scikit-learn', 'Imbalanced-Learn', 'Pandas'],
    difficulty: 'intermediate',
    estimatedTime: '8 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/17-projects-intermediate',
    outcomes: [
      'Establish robust pipelines preventing SMOTE leakage into K-fold test sets',
      'Improve fraud recall rates by over 40% while preserving reasonable precision targets',
      'Deploy threshold search procedures to limit real financial penalties'
    ]
  },
  {
    id: 'proj-segmentation',
    title: 'Customer Spatial Segmentation via DBSCAN Clustering',
    modulePath: '08-unsupervised-learning',
    description: 'Analyze retail loyalty records. Standardize scales, extract purchasing centroids, and cluster cohorts using K-Means and DBSCAN. Visualize clusters in lower dimensions.',
    skillsLearned: ['Clustering Algorithms', 'Feature Scaling', 'Manifold Projections'],
    technologies: ['Python', 'scikit-learn', 'Matplotlib', 'UMAP'],
    difficulty: 'intermediate',
    estimatedTime: '6 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/17-projects-intermediate',
    outcomes: [
      'Select cluster partitions using the Elbow rate and Silhouette criteria',
      'Map multi-dimensional clusters into 2D plots using PCA or t-SNE',
      'Draft detailed demographic summaries for each discovered customer subset'
    ]
  },
  {
    id: 'proj-transformer',
    title: 'Fine-Tuning BERT for Custom Sentiment Attributions',
    modulePath: '12-natural-language-processing',
    description: 'Bypass simple keyword classification counters. Tokenize thousands of custom product descriptions, load pre-trained bidirectional transformer blocks, and train attention anchors.',
    skillsLearned: ['HuggingFace Hub', 'Transformer Pipelines', 'Tokenization', 'AdamW Optimization'],
    technologies: ['PyTorch', 'HuggingFace Transformers', 'Python', 'CUDA'],
    difficulty: 'advanced',
    estimatedTime: '12 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/18-projects-advanced',
    outcomes: [
      'Build tokenization collator instances loading input masks into VRAM',
      'Fine-tune deep encoder weights on specific semantic datasets',
      'Deploy the compiled models inside containerized classification servers'
    ]
  },
  {
    id: 'proj-rag',
    title: 'Retrieval Augmented Generation with LoRA Calibration',
    modulePath: '25-generative-ai-llms',
    description: 'Design a self-hosted academic summarization engine. Index research papers into standard vector spaces, design multi-hop query retrievers, and fine-tune models using QLoRA configurations.',
    skillsLearned: ['Parameter-Efficient Tuning', 'Vector DB Indexing', 'Context Retrieval', 'Prompt Engineering'],
    technologies: ['PyTorch', 'PEFT (LoRA)', 'FAISS / Chroma', 'HuggingFace'],
    difficulty: 'advanced',
    estimatedTime: '16 hours',
    githubLink: 'https://github.com/NabidAlam/road-to-machine-learning/tree/main/18-projects-advanced',
    outcomes: [
      'Optimize RAG lookup accuracy using custom similarity ranking standards',
      'Fine-tune generative models to respect retrieval context constraints',
      'Eliminate hallucination loops in complex domain-specific tasks'
    ]
  }
];

export const STATIC_RESOURCES: ResourceItem[] = [
  {
    id: 'res-islr',
    title: 'Introduction to Statistical Learning (with Applications in Python)',
    category: 'Books',
    description: 'The golden entry point text covering fundamental algorithms of regression, classification, clustering, hyperparameter tuning, and baseline networks.',
    link: 'https://www.statlearning.com/',
    tags: ['ML Basics', 'Python', 'Statistical Models'],
    author: 'Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani'
  },
  {
    id: 'res-deeplearning-book',
    title: 'Deep Learning',
    category: 'Books',
    description: 'The ultimate textbook on neural architectures, linear algebra, capacity bounds, optimization algorithms, and specialized sequence modules.',
    link: 'https://www.deeplearningbook.org/',
    tags: ['Deep Learning', 'Neural Networks', 'Math Foundations'],
    author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville'
  },
  {
    id: 'res-fastai',
    title: 'Practical Deep Learning for Coders',
    category: 'Courses',
    description: 'An excellent top-down course that teaches highly efficient deep learning frameworks, model training, computer vision, and transformers.',
    link: 'https://course.fast.ai/',
    tags: ['PyTorch', 'Computer Vision', 'Deep Learning'],
    author: 'Jeremy Howard'
  },
  {
    id: 'res-shun-yuan',
    title: 'StatQuest with Josh Starmer',
    category: 'Videos',
    description: 'Incredibly simple but highly rigorous explanations of PCA, support vector machines, random forests, decision trees, neural networks, and standard ML mathematics.',
    link: 'https://www.youtube.com/c/joshstarmer',
    tags: ['Math', 'ML Basics', 'Visualization'],
    author: 'Josh Starmer'
  },
  {
    id: 'res-scikit-docs',
    title: 'Scikit-Learn Official User Guides',
    category: 'Tools',
    description: 'Highly detailed official implementation walkthroughs for regression penalty curves, cross validation matrices, pipeline structures, and preprocessors.',
    link: 'https://scikit-learn.org/stable/user_guide.html',
    tags: ['Documentation', 'Python', 'Scikit-Learn'],
    author: 'Scikit-Learn Core Team'
  },
  {
    id: 'res-pytorch-tutorials',
    title: 'PyTorch Step-by-Step Training Walkthroughs',
    category: 'Tools',
    description: 'Detailed interactive codelabs demonstrating torch tensor math, stateful optimizer steps, device context variables, and neural network weight shapes.',
    link: 'https://pytorch.org/tutorials/',
    tags: ['PyTorch', 'Deep Learning', 'Tensors'],
    author: 'PyTorch Core Developers'
  },
  {
    id: 'res-roadmap-sh-ai',
    title: 'Roadmap.sh AI and Data Science Pathways',
    category: 'Frameworks',
    description: 'Interactive visual hierarchy showing how data engineering, machine learning foundations, math steps, CV, and generative agents connect.',
    link: 'https://roadmap.sh/ai-data-scientist',
    tags: ['Learning Path', 'Syallbus', 'ML Roadmap'],
    author: 'Roadmap Community'
  }
];

export const STATIC_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'ach-welcome',
    title: 'First Step to Hero',
    description: 'Initialize your scientific Machine Learning training plan.',
    iconName: 'Play',
    condition: 'Load the platform dashboard'
  },
  {
    id: 'ach-coder',
    title: 'NumPy Ninja',
    description: 'Familiarize yourself with prerequisites and python directories.',
    iconName: 'Code',
    condition: 'Mark 2 beginner lessons complete'
  },
  {
    id: 'ach-optimizer',
    title: 'Loss Minimizer',
    description: 'Complete supervised regression and class validation files.',
    iconName: 'TrendingUp',
    condition: 'Complete 5 platform lessons'
  },
  {
    id: 'ach-deep',
    title: 'Gradient Navigator',
    description: 'Delve deeply into PyTorch network architectures.',
    iconName: 'Cpu',
    condition: 'Complete a neural network lesson'
  },
  {
    id: 'ach-genius',
    title: 'Artificial Mastermind',
    description: 'Finetune massive generative architectures.',
    iconName: 'Sparkles',
    condition: 'Mark the Generative AI or NLP modules complete'
  },
  {
    id: 'ach-streak-3',
    title: 'Consistent Learner',
    description: 'Keep your active study streak alive for 3 consecutive rounds.',
    iconName: 'Flame',
    condition: 'Unlock regular streak progress'
  }
];
