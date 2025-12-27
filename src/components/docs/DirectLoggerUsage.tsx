import { CodeBlock } from "./CodeBlock";

export function DirectLoggerUsage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Direct Logger Usage
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Use loggerect directly without hooks, HOCs, or decorators. Perfect for
          utility functions, services, event handlers, and any non-React code.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Basic Import and Usage
        </h2>
        <p className="text-[var(--text-secondary)]">
          Import the logger and start logging immediately:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Simple logging
logger.info("Application started");
logger.debug("Debug information");
logger.warn("Warning message");
logger.error("Error occurred");`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Levels
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use different log levels based on the importance and verbosity needed:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// TRACE - Most verbose, detailed tracing
logger.trace("Detailed trace information", { step: 1, data: {...} });

// DEBUG - Debug information
logger.debug("Debug information", { userId: 123, action: "login" });

// INFO - General information
logger.info("User logged in", { userId: 123, timestamp: Date.now() });

// WARN - Warnings
logger.warn("API rate limit approaching", { remaining: 10 });

// ERROR - Errors
logger.error("Failed to fetch data", { error: err, endpoint: "/api/users" });

// Generic log method with level
logger.log("info", "Custom log level", { data: "value" });`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Logging with Data
        </h2>
        <p className="text-[var(--text-secondary)]">
          Attach additional data to your logs for better debugging:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Simple object data
logger.info("User action", {
  userId: 123,
  action: "click",
  element: "button",
  timestamp: Date.now(),
});

// Complex nested objects
logger.debug("API response", {
  status: 200,
  data: {
    users: [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ],
  },
  headers: {
    "content-type": "application/json",
  },
});

// Arrays
logger.info("Processing items", {
  items: [1, 2, 3, 4, 5],
  total: 5,
});

// Error objects
try {
  throw new Error("Something went wrong");
} catch (error) {
  logger.error("Caught exception", {
    error,
    stack: error.stack,
    context: "user registration",
  });
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Component-Scoped Logging
        </h2>
        <p className="text-[var(--text-secondary)]">
          Create a logger scoped to a specific component for better
          organization:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Create a component-scoped logger
const userLogger = logger.forComponent("UserProfile");

// All logs from this logger will include component context
userLogger.info("Component initialized");
userLogger.debug("Fetching user data", { userId: 123 });

// Use in class components
class UserService {
  private log = logger.forComponent("UserService");
  
  async fetchUser(id: string) {
    this.log.debug("Fetching user", { id });
    // ... fetch logic
    this.log.info("User fetched successfully", { id });
  }
}

// Use in utility functions
function processPayment(amount: number) {
  const log = logger.forComponent("PaymentProcessor");
  log.info("Processing payment", { amount });
  // ... payment logic
  log.info("Payment processed", { amount, status: "success" });
}

// Use in Next.js Server Components (SSR)
import { logger, isServer } from "loggerect";

export default async function ServerPage() {
  if (isServer()) {
    const log = logger
      .forComponent("ServerPage")
      .withTags("server", "page");
    
    log.info("Rendering page on server");
  }
  
  return <div>Server-rendered content</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Adding Tags and Metadata
        </h2>
        <p className="text-[var(--text-secondary)]">
          Add tags and metadata to categorize and filter logs:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Create a logger with tags
const apiLogger = logger.withTags("api", "http");

// All logs will include these tags
apiLogger.info("API request", { endpoint: "/users" });
// Logs will show: [api] [http] API request

// Add metadata to logger context
const authLogger = logger
  .withTags("auth", "security")
  .withMetadata({ 
    userId: 123,
    sessionId: "abc123",
  });

// All logs include the metadata
authLogger.info("User authenticated");
// Includes: userId: 123, sessionId: "abc123"

// Chain multiple context builders
const featureLogger = logger
  .forComponent("CheckoutFlow")
  .withTags("ecommerce", "checkout")
  .withMetadata({ 
    cartId: "cart_123",
    step: "payment",
  });

featureLogger.info("Payment step started");
// Includes component, tags, and metadata`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Performance Timing
        </h2>
        <p className="text-[var(--text-secondary)]">
          Measure execution time of operations:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Manual timing
logger.time("fetchData");
await fetchData();
logger.timeEnd("fetchData");
// Logs: ⏱️ fetchData: 234.56ms

// Timing with metadata
logger.time("processOrder", { orderId: 123 });
await processOrder(123);
logger.timeEnd("processOrder");
// Logs: ⏱️ processOrder: 456.78ms { orderId: 123 }

// Automatic measurement of async functions
const result = await logger.measure("fetchUser", async () => {
  return await fetch("/api/user").then(r => r.json());
});
// Automatically logs timing and returns the result

// Multiple timers
logger.time("step1");
await step1();
logger.timeEnd("step1"); // ⏱️ step1: 100ms

logger.time("step2");
await step2();
logger.timeEnd("step2"); // ⏱️ step2: 200ms

// Nested timers
logger.time("totalOperation");
logger.time("subOperation1");
await subOperation1();
logger.timeEnd("subOperation1"); // ⏱️ subOperation1: 50ms
logger.timeEnd("totalOperation"); // ⏱️ totalOperation: 50ms`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Component Lifecycle Logging
        </h2>
        <p className="text-[var(--text-secondary)]">
          Log component mount, unmount, and render events:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// In class components
class MyComponent extends React.Component {
  componentDidMount() {
    logger.mount("MyComponent");
    // Logs: 🚀 Mounted
  }
  
  componentWillUnmount() {
    logger.unmount("MyComponent");
    // Logs: 💤 Unmounted
  }
  
  render() {
    logger.render("MyComponent", this.props);
    // Logs: 🎨 Render { props: {...} }
    return <div>Hello</div>;
  }
}

// In functional components (manual)
function MyComponent() {
  useEffect(() => {
    logger.mount("MyComponent");
    return () => {
      logger.unmount("MyComponent");
    };
  }, []);
  
  logger.render("MyComponent");
  return <div>Hello</div>;
}

// With component-scoped logger
const componentLogger = logger.forComponent("UserProfile");

componentLogger.mount("UserProfile");
// Logs: 🚀 Mounted (with component context)

componentLogger.render("UserProfile", { userId: 123 });
// Logs: 🎨 Render { props: { userId: 123 } }`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          State and Prop Change Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Track when state or props change:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Track state changes
class Counter extends React.Component {
  state = { count: 0 };
  
  increment = () => {
    const prevCount = this.state.count;
    this.setState({ count: prevCount + 1 }, () => {
      logger.stateChanged(
        "Counter",
        "count",
        prevCount,
        this.state.count
      );
      // Logs: 🗃️ State "count" changed { prev: 0, next: 1 }
    });
  };
}

// Track prop changes
class UserProfile extends React.Component {
  componentDidUpdate(prevProps) {
    const changes = {};
    Object.keys(this.props).forEach(key => {
      if (this.props[key] !== prevProps[key]) {
        changes[key] = {
          prev: prevProps[key],
          next: this.props[key],
        };
      }
    });
    
    if (Object.keys(changes).length > 0) {
      logger.propsChanged("UserProfile", changes);
      // Logs: 📦 Props changed { userId: { prev: 1, next: 2 } }
    }
  }
}

// With component-scoped logger
const log = logger.forComponent("MyComponent");

log.stateChanged("MyComponent", "isLoading", false, true);
log.propsChanged("MyComponent", {
  userId: { prev: 1, next: 2 },
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Event Handlers and Callbacks
        </h2>
        <p className="text-[var(--text-secondary)]">
          Log user interactions and event handlers:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Button click handler
function handleButtonClick(event) {
  logger.info("Button clicked", {
    buttonId: event.target.id,
    timestamp: Date.now(),
  });
}

// Form submission
function handleSubmit(formData) {
  logger.info("Form submitted", {
    formId: "login-form",
    fields: Object.keys(formData),
  });
  
  try {
    await submitForm(formData);
    logger.info("Form submitted successfully");
  } catch (error) {
    logger.error("Form submission failed", { error });
  }
}

// API call handlers
async function fetchUserData(userId) {
  const log = logger.forComponent("UserService").withTags("api");
  
  log.debug("Fetching user data", { userId });
  
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    
    log.info("User data fetched", { userId, data });
    return data;
  } catch (error) {
    log.error("Failed to fetch user data", { userId, error });
    throw error;
  }
}

// Keyboard events
document.addEventListener("keydown", (event) => {
  logger.debug("Key pressed", {
    key: event.key,
    code: event.code,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
  });
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Service and Utility Functions
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use logger in services, utilities, and non-React code:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Service class
class AuthService {
  private log = logger.forComponent("AuthService").withTags("auth");
  
  async login(email: string, password: string) {
    this.log.info("Login attempt", { email });
    
    try {
      const user = await this.validateCredentials(email, password);
      this.log.info("Login successful", { userId: user.id });
      return user;
    } catch (error) {
      this.log.error("Login failed", { email, error });
      throw error;
    }
  }
  
  async logout(userId: string) {
    this.log.info("Logout", { userId });
    // ... logout logic
  }
}

// Utility functions
function formatCurrency(amount: number, currency: string = "USD") {
  const log = logger.forComponent("CurrencyFormatter");
  
  log.debug("Formatting currency", { amount, currency });
  
  try {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
    
    log.debug("Currency formatted", { amount, currency, formatted });
    return formatted;
  } catch (error) {
    log.error("Currency formatting failed", { amount, currency, error });
    return amount.toString();
  }
}

// Data processing
function processBatch(items: any[]) {
  const log = logger
    .forComponent("BatchProcessor")
    .withMetadata({ batchSize: items.length });
  
  log.info("Starting batch processing");
  logger.time("processBatch");
  
  items.forEach((item, index) => {
    logger.time(\`processItem_\${index}\`);
    processItem(item);
    logger.timeEnd(\`processItem_\${index}\`);
  });
  
  logger.timeEnd("processBatch");
  log.info("Batch processing completed");
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Error Handling and Logging
        </h2>
        <p className="text-[var(--text-secondary)]">
          Comprehensive error logging:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Try-catch blocks
async function riskyOperation() {
  const log = logger.forComponent("RiskyOperation");
  
  try {
    log.debug("Starting operation");
    const result = await performOperation();
    log.info("Operation completed", { result });
    return result;
  } catch (error) {
    log.error("Operation failed", {
      error,
      errorMessage: error.message,
      errorStack: error.stack,
      context: "risky operation",
    });
    throw error;
  }
}

// Error boundaries (React)
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logger.error("React Error Boundary caught error", {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });
  }
}

// Global error handlers
window.addEventListener("error", (event) => {
  logger.error("Global error", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  logger.error("Unhandled promise rejection", {
    reason: event.reason,
    promise: event.promise,
  });
});

// API error handling
async function apiCall(endpoint: string) {
  const log = logger.forComponent("APIClient").withTags("api");
  
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      log.warn("API returned error status", {
        endpoint,
        status: response.status,
        statusText: response.statusText,
      });
    }
    
    return await response.json();
  } catch (error) {
    log.error("API call failed", {
      endpoint,
      error,
      networkError: error.message,
    });
    throw error;
  }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Conditional Logging
        </h2>
        <p className="text-[var(--text-secondary)]">
          Log conditionally based on environment or conditions:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Environment-based logging
if (process.env.NODE_ENV === "development") {
  logger.debug("Development-only log", { debugInfo: "..." });
}

// Conditional logging
function processPayment(amount: number) {
  const log = logger.forComponent("PaymentProcessor");
  
  if (amount > 1000) {
    log.warn("Large payment amount", { amount });
  }
  
  if (amount < 0) {
    log.error("Invalid payment amount", { amount });
    return;
  }
  
  log.info("Processing payment", { amount });
}

// Feature flag logging
const FEATURE_FLAGS = {
  verboseLogging: true,
};

function complexOperation() {
  const log = logger.forComponent("ComplexOperation");
  
  log.info("Operation started");
  
  if (FEATURE_FLAGS.verboseLogging) {
    log.trace("Step 1: Initialization", { step: 1 });
    log.trace("Step 2: Processing", { step: 2 });
    log.trace("Step 3: Finalization", { step: 3 });
  }
  
  log.info("Operation completed");
}

// User permission-based logging
function adminAction(user: User, action: string) {
  const log = logger
    .forComponent("AdminAction")
    .withMetadata({ userId: user.id, action });
  
  if (user.isAdmin) {
    log.info("Admin action executed", { user: user.id, action });
  } else {
    log.warn("Unauthorized admin action attempt", { user: user.id, action });
  }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Logger Configuration
        </h2>
        <p className="text-[var(--text-secondary)]">
          Configure logger instance-specific settings:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Configure the logger instance
logger.configure({
  level: "debug",
  format: "pretty",
});

// Create a configured logger for specific use case
const apiLogger = logger
  .forComponent("APIService")
  .withTags("api", "http")
  .configure({
    level: "info", // Only info and above for API logs
  });

// Different loggers with different configurations
const debugLogger = logger.configure({ level: "trace" });
const productionLogger = logger.configure({ level: "warn" });

// Use in different environments
const appLogger = process.env.NODE_ENV === "production"
  ? productionLogger
  : debugLogger;

appLogger.info("Application started");`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Real-World Examples
        </h2>
        <p className="text-[var(--text-secondary)]">
          Complete examples for common scenarios:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Example 1: E-commerce checkout flow
class CheckoutService {
  private log = logger
    .forComponent("CheckoutService")
    .withTags("ecommerce", "checkout");
  
  async processCheckout(cart: Cart, payment: Payment) {
    this.log.info("Checkout started", {
      cartId: cart.id,
      itemCount: cart.items.length,
      total: cart.total,
    });
    
    logger.time("checkoutProcess");
    
    try {
      // Validate cart
      logger.time("validateCart");
      await this.validateCart(cart);
      logger.timeEnd("validateCart");
      
      // Process payment
      logger.time("processPayment");
      const paymentResult = await this.processPayment(payment);
      logger.timeEnd("processPayment");
      this.log.info("Payment processed", { paymentId: paymentResult.id });
      
      // Create order
      logger.time("createOrder");
      const order = await this.createOrder(cart, paymentResult);
      logger.timeEnd("createOrder");
      
      logger.timeEnd("checkoutProcess");
      this.log.info("Checkout completed", { orderId: order.id });
      
      return order;
    } catch (error) {
      logger.timeEnd("checkoutProcess");
      this.log.error("Checkout failed", {
        cartId: cart.id,
        error,
        step: "checkout",
      });
      throw error;
    }
  }
}

// Example 2: Data synchronization
async function syncData(source: string, target: string) {
  const log = logger
    .forComponent("DataSync")
    .withTags("sync", "data")
    .withMetadata({ source, target });
  
  log.info("Starting data synchronization");
  
  const syncLogger = logger.measure("syncData", async () => {
    const sourceData = await logger.measure("fetchSource", async () => {
      log.debug("Fetching source data", { source });
      return await fetch(source).then(r => r.json());
    });
    
    log.info("Source data fetched", { recordCount: sourceData.length });
    
    const transformed = await logger.measure("transformData", async () => {
      log.debug("Transforming data");
      return transform(sourceData);
    });
    
    await logger.measure("saveTarget", async () => {
      log.debug("Saving to target", { target });
      await save(target, transformed);
    });
    
    return { synced: transformed.length };
  });
  
  log.info("Data synchronization completed", syncLogger);
}

// Example 3: User authentication flow
class AuthManager {
  private log = logger
    .forComponent("AuthManager")
    .withTags("auth", "security");
  
  async authenticate(credentials: Credentials) {
    this.log.info("Authentication attempt", {
      username: credentials.username,
    });
    
    try {
      const user = await this.validateUser(credentials);
      
      if (!user) {
        this.log.warn("Invalid credentials", {
          username: credentials.username,
        });
        return null;
      }
      
      const token = await this.generateToken(user);
      
      this.log.info("Authentication successful", {
        userId: user.id,
        tokenGenerated: !!token,
      });
      
      return { user, token };
    } catch (error) {
      this.log.error("Authentication error", {
        username: credentials.username,
        error,
      });
      throw error;
    }
  }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Best Practices
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🎯 Use Component-Scoped Loggers
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Create component-scoped loggers for better organization and
              filtering. Use{" "}
              <code className="text-[var(--accent-green)]">
                logger.forComponent()
              </code>{" "}
              to create scoped loggers.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🏷️ Use Tags for Categorization
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Add tags to categorize logs (e.g., &quot;api&quot;,
              &quot;auth&quot;, &quot;ui&quot;). This makes filtering and
              searching logs much easier.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              ⏱️ Measure Performance
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Use{" "}
              <code className="text-[var(--accent-green)]">logger.time()</code>{" "}
              and{" "}
              <code className="text-[var(--accent-green)]">
                logger.timeEnd()
              </code>{" "}
              or{" "}
              <code className="text-[var(--accent-green)]">
                logger.measure()
              </code>{" "}
              to track operation performance.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              📊 Include Relevant Context
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Always include relevant data in your logs. This makes debugging
              much easier when issues occur.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🔒 Don&apos;t Log Sensitive Data
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Never log passwords, tokens, or other sensitive information. Use
              transformers to redact sensitive data if needed.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🎚️ Use Appropriate Log Levels
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Use trace for detailed debugging, debug for development info, info
              for general events, warn for warnings, and error for errors only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}