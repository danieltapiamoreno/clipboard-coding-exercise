# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### EPIC 001
As a registered facility. I want to be able to save my own custom ids for each Agent they work with and use that id when generating reports for them.

### DEFINITION OF DONE.
- Unit tests passed.
- No Vulnerabilities.
- No code smells.
- Meets 80% coverage of lines of code.
- Two or more code reviews in the PR approved.
- Deployed to test environment.
- Functional Tests passed.
- Regression tests passed.
- Deployed to production.
- Production monitoring with no errors.
- Product owner accpets the User Story.

#### TASK 001-001 Create new Table with a new field customIdAgent and fill it out with existing data (5 points)
- Define an schema for a new table with these specifications:
    Table name: `facility-agent`
    Fields:
    - `idFacility`        VARCHAR PK
    - `idAgent`           VARCHAR PK
    - `customIdAgent`     VARCHAR NULL
- Create the SQL query to create the new table.
- Create sript to fill the table with `idFacility` and `idAgent`, leave the `customIdAgent` empty.


#### TASK 001-002 Create services to save customIdAgent in facility-agent table (8 points)
- Create the entity `FacilityAgent` entity and map the table facility-agent.
- Create the `FacilityAgentRepository` function (updateFacilityCustomAgent) that update the customIdAgent based on idFacility and idAgent.
- Create a service that calls the repository and return the retrieved data.

- Create endpoint updateCustomIdAgentByFacilityAndShift
    - NAME: `getCustomIdAgentByFacilityAndShift`
    - Method: PUT
    - Return the 200 HTTP code in successfully case and 4XX or 5XX HTTP codes for errors
    - Document the service using swagger
    - Request:
        ``` ``` javascript
        {
            idFacility: string | required,
            idAgent: string  | required,
            customIdAgent: string | required,
        }
        ```
    - Response
        ``` javascript
        {
            idFacility: string,
            idAgent: string,
            customIdAgent: string | required,
        }
        ```

#### TASK 001-003 Create a web form to fill facility-agent table (8 points)
- Develop a form to modify the customIdAgent
    idAgent: string | required
    customIdAgent: string | required

- Develop the updateCustomIdAgentByFacilityAndShift request based on these info:
    - NAME: getCustomIdAgentByFacilityAndShift
    - Method: PUT
    - Request:
    - Response 200 HTTP code
        ``` javascript
        {
            idFacility: string | required,  // -> get from logged user
            idAgent: string  | required,
            customIdAgent: string | required,
        }
        ```

#### TASK 001-004 Use generateReport sending customIdAgent (5 points)
- Modify generateReport, it should accept the new field generateReport
- Make a request to getShiftsByFacility and use that information to build the new request to generateReport
- Request generateReport with the new customIdAgent.
- Generate the PDF.
