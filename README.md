# apitrace-remote-viewer

Web front end for the apitrace-remote service

## Background

This web application renders data from the apitrace-remote service, and enables inspection of OpenGL state remotely.

## Views

### ListApplications

#### Path

`/`

#### Description

Performs a `GET` against the `/apps` endpoint of the apitrace-remote service to retrieve a list of applications registered for remote tracing

#### Sample data

```json
[
  {
    "id": "fpg4",
    "name": "fpg4",
    "description": "cool",
    "branch": "hellmouthxyz",
    "traces": 2
  },
  {
    "id": "fpg4-1",
    "name": "fpg4",
    "description": "cool",
    "branch": "hellmouthxyz",
    "traces": 1
  }
]
```

### AddApplication

#### Path

`/add`

#### Description

Performs a `POST` against the `/apps/:name` endpoint of the apitrace-remote service to add an application for remote tracing

#### Sample data

```json
{
  "apitrace": "/usr/bin/apitrace",
  "branch": "hellmouthxyz",
  "buildScript": "build.sh",
  "description": "cool",
  "dumpImages": true,
  "executable": "main",
  "name": "joe",
  "privateKey": "/home/joe/.ssh/id_rsa",
  "retrace": "/usr/bin/glretrace",
  "timeout": 2,
  "url": "joe@joessite.com:~/git/fpg4",
  "user": "joe"
}
```

### ViewApplication

#### Path

`/app/:id`

#### Description

Performs a `GET` against the `/apps/:name` endpoint of the apitrace-remote service to retrieve an application's details

#### Sample data

```json
{
  "apitrace": "/usr/bin/apitrace",
  "branch": "hellmouthxyz",
  "buildScript": "build.sh",
  "description": "cool",
  "dumpImages": true,
  "id": "appID",
  "executable": "main",
  "name": "joe",
  "privateKey": "/home/joe/.ssh/id_rsa",
  "retrace": "/usr/bin/glretrace",
  "timeout": 2,
  "url": "joe@joessite.com:~/git/fpg4",
  "user": "joe",
  "traces": ["trace1", "trace2"]
}
```

### EditApplication

#### Path

`/edit`

#### Description

Performs a `PUT` against the `/apps/:name` endpoint of the apitrace-remote service to update an application's details

#### Sample data

```json
{
  "apitrace": "/usr/bin/apitrace",
  "branch": "hellmouthxyz",
  "buildScript": "build.sh",
  "description": "cool",
  "dumpImages": true,
  "executable": "main",
  "name": "joe",
  "privateKey": "/home/joe/.ssh/id_rsa",
  "retrace": "/usr/bin/glretrace",
  "timeout": 2,
  "url": "joe@joessite.com:~/git/fpg4",
  "user": "joe"
}
```

### ViewTrace

#### Path

`/trace/:traceid/:frame`

#### Description

Performs a `GET` against the `/dumps/:name/:frame` endpoint of the apitrace-remote service to retrieve the OpenGL calls made for a particular frame of a particular trace

### ViewDump

#### Path

`/dump/:traceid/:callID`

#### Description

Performs a `GET` against the `/retrace/:name/:callID` endpoint of the apitrace-remote service to retrieve the OpenGL state for a particular call in a particular frame of a particular trace

## To do

- [ ] Make the apitrace-remote service endpoint configurable (currently hardcoded to localhost)
- [ ] Read in application defaults from a file (to provide sensible default values when adding an application)
- [ ] Add a config view to change the defaults from the defaults provided in the config file
- [ ] Better layout for the view application page, more statistics, better focus on important data
- [ ] Add pop ups for confirmation of duplicate/delete/trace actions
- [ ] Add spinners on button actions for better feedback to the end user
- [ ] Add loading icon on the trace view, large data sets take a long time to populate
- [ ] Fix navigation issues on the trace view, next and previous buttons update the URL but don't rerender the page
- [ ] Add renders of the front/back buffers, depth and stencil buffers to frame view, based on the last call ID for that frame
- [ ] Change the dump view to actively reload until data is available for rendering, probably should do this for the trace view also
- [ ] Add image component to asynchronously load the view buffers for the current call in the dump view
- [ ] Handle empty datasets in a cleaner way
- [ ] Add search boxes to the dump view for filtering OpenGL parameters
