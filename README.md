# certificator
FHIR certificator for MoH

# Entities

## Test
### Objective tests
Tests where we can programmatically determine if the test passed or failed

### Subjective tests
Tests where a human needs to evaluate if  the test passed or failed

## Test kit

## Sample

## Action
Action == Fume map

Action can be a prerequisite step (like performing a GET resource) or evaluation of a logical condition as part of the test such as testing if resourceType is as expected.

Action attributes
* id -
* description - human-readable text
* mapping - the name of the map

Action status
e.g actionStatus_[mapping].json => actionStatus_isMetadataResourceTypeOk.json
**TBD**

## Test run