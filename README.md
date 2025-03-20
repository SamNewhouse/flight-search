# Flight Search API

This project is a **GraphQL-based Flight Search API** built using **Next.js, Prisma, Nexus, and PostgreSQL**. It allows users to search for flights based on various filters and retrieves flight details including **price, CO₂ emissions and duration**.

---

## **🚀 Features**
- **GraphQL API** using `nexus`
- **Flight search with filters** (airline, date)
- **CO₂ emission calculations** based on real-world data
- **Flight duration calculation** based on distance and average speed 
- **PostgreSQL + Prisma ORM** for structured data storage
- **Dockerized environment** for easy deployment
- **Redis caching** for performance optimization
- **Autocomplete for airline selection**

---

## **📌 Setup Instructions**
### **1️⃣ Install Dependencies**
```bash
npm install
```

### **2️⃣ Start Docker Services (PostgreSQL & Redis)**
```bash
docker-compose up -d
```
If **port 5432 is already in use**, change it to `5433` in `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"
```

### **3️⃣ Apply Prisma Migrations**
```bash
npx prisma migrate dev
```

### **4️⃣ Seed the Database (Optional)**
```bash
npx prisma db seed
```

### **5️⃣ Start the Development Server**
```bash
npm run dev
```
API will be available at: [`http://localhost:3000/api/graphql`](http://localhost:3000/api/graphql)

---

## **📌 API Usage**
### **1️⃣ Get All Flights**
```graphql
query {
  flights {
    flightNumber
    airline
    price
  }
}
```

### **2️⃣ Search Flights by Airline and Date**
```graphql
query {
  flights(airline: "British Airways", date: "2025-03-18") {
    flightNumber
    airline
    price
  }
}
```

### **3️⃣ Search Flights with Passenger Count**
```graphql
query {
  flights(airline: "Lufthansa", date: "2025-06-10", passengerCount: 3) {
    flightNumber
    airline
    price
    totalCost
  }
}
```

### **4️⃣ Get Flight by ID**
```graphql
query {
  flightById(id: "some-uuid") {
    flightNumber
    airline
  }
}
```

---

## **📌 Design Decisions**
### **✅ Why GraphQL Instead of REST?**
- **Flexible queries** (only fetch required fields)
- **Easier frontend integration** (avoids multiple REST endpoints)
- **Efficient data fetching** (no over-fetching)

### **✅ Why PostgreSQL with Prisma?**
- **Strong relational capabilities** (flights, bookings, users)
- **Type-safe queries with Prisma ORM**
- **Scalability** using indexing and partitioning

### **✅ Why Docker?**
- Ensures **consistent environment** across machines  
- Easy deployment using **Docker Compose**  

---

## **📌 Troubleshooting**
### **❌ Port 5432 Already in Use**
Run:
```bash
sudo lsof -i :5432  # Find the process using the port
sudo kill -9 <PID>   # Replace <PID> with the actual process ID
```
or change PostgreSQL to `5433` in `docker-compose.yml`.

### **❌ Prisma Errors**
Run:
```bash
npx prisma generate
npx prisma migrate dev
```
If Prisma Studio fails:
```bash
npx prisma studio
```

---

# **System Design Document**

## **1️⃣ Architecture Overview**
The system follows a **client-server architecture**:
- **Frontend:** Can be a React/Next.js app (not implemented yet).
- **Backend:** Next.js API Routes with GraphQL (`nexus`).
- **Database:** PostgreSQL with Prisma ORM.
- **Cache Layer:** Redis (for query caching).

---

## **2️⃣ Component Breakdown**
### **📌 Backend Components**
| Component       | Description |
|----------------|-------------|
| **GraphQL API** | Handles flight queries & filtering |
| **Prisma ORM** | Manages PostgreSQL schema & queries |
| **Redis Cache** | Improves response time for repeated queries |
| **Dockerized DB** | Runs PostgreSQL inside a container |

### **📌 API Endpoint**
- **GraphQL Endpoint:** `/api/graphql`
- **Queries:**
  - `flights`: Retrieve flights with filters.
  - `flightById`: Get flight details by ID.

---

## **3️⃣ Database Schema**
### **📌 Flight Table**
```sql
CREATE TABLE "Flight" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "flightNumber" TEXT NOT NULL,
  "airline" TEXT NOT NULL,
  "departureCity" TEXT NOT NULL,
  "destinationCity" TEXT NOT NULL,
  "departureTime" TIMESTAMP NOT NULL,
  "arrivalTime" TIMESTAMP NOT NULL,
  "price" FLOAT NOT NULL,
  "co2Emissions" FLOAT NOT NULL,
  "distance" INT NOT NULL,
  "date" TEXT NOT NULL
);
```

---

## **4️⃣ Considerations for Scaling**
| Potential Issue         | Solution |
|------------------------|----------|
| **Slow Queries**       | Use **Redis caching** for common searches |
| **High DB Load**       | Implement **pagination** (`limit`, `cursor-based`) |
| **Scaling Reads**      | Use **read replicas** for PostgreSQL |
| **High API Load**      | Deploy **GraphQL in a serverless function (Vercel, AWS Lambda)** |
| **Large Datasets**     | Use **PostgreSQL indexing** for faster lookups |


