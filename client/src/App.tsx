import React, { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';
import client from './api/api-client';
import { Button, Card, Container, Modal, Row, Spinner } from 'react-bootstrap';
import { Cities, City } from './models';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cities, setCities] = useState<Array<City> | null>(null);
  const [filterByContinentOptions, setFilterByContinentOptions] = useState<Array<string> | null>(null);
  const [show, setShowModal] = useState(false);
  const [position, setMapPosition] = useState<LatLngExpression>([44.4268, 26.1025]);
  const [city, setCity] = useState<City | null>(null);
  const citiesRef = useRef<Array<City> | null>(null);
  const markerIcon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const filterEventHandler = useCallback((event) => {
    if (event !== 'all') {
      setCities([...citiesRef.current ?? []].filter(city => city.continent === event));
    } else {
      setCities([...citiesRef.current ?? []]);
    }
  }, []);

  useEffect(() => {
    client('cities', {
    }).then((data: Cities) => {
      const { cities } = data;
      citiesRef.current = cities;
      setCities(cities);
      const filterByContinentOptions = cities.reduce((acc: Array<string>, crtElem: City, pos: number, self: Array<City>) => {
        const { continent } = crtElem;
        if (self.findIndex(elem => elem.continent === continent) === pos) {
          acc.push(continent);
          return acc;
        }
        return acc;
      }, []);
      setFilterByContinentOptions(filterByContinentOptions);
    }, (err) => {
      console.log('err: ', err);
    });
  }, []);

  const openMap = (position: LatLngExpression, city:City) => {
    setShowModal(true);
    setMapPosition(position);
    setCity(city);
  }

  const renderCardText = (city:City|null, ommit:Array<string> = []) => {
    let cardTextPropsArr = ['country', 'continent', 'founded', 'population', 'landmarks'];
    if (ommit.length) {
      cardTextPropsArr = cardTextPropsArr.filter((elem) => ommit.indexOf(elem) === -1);
    }
    if (!city) {
      return null;
    }

    return cardTextPropsArr.map((key: string) => {
      if (!Array.isArray(city[key as keyof typeof city])) {
        return (<span key={key} className='d-block'><strong>{key}:</strong> {city[key as keyof typeof city]}</span>);
      }
      return (<span key={key} className='d-block'><i><strong>{key}:</strong> {(city[key as keyof typeof city] as Array<string>).join(', ')}</i></span>);
    })
  }

  const renderCards = (citiesArr: Array<City>) => {
    return citiesArr.map((city:City, index:number) => {
      return (<Card key={`${city.founded}_${index}`} style={{ width: '18rem' }}>
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{city.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{city.name_native}</Card.Subtitle>
          <Card.Text>
            {renderCardText(city)}
          </Card.Text>
          <Button variant='primary' className='mt-auto' onClick={() => openMap([+city.latitude, +city.longitude], city)}>
            Show on map
          </Button>
        </Card.Body>
      </Card>);
    });
  }

  if (cities === null || filterByContinentOptions === null) {
    return (
      <Container className='d-flex justify-content-center align-items-center vh-100'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Container>);
  }

  return (
    <>
      <Header
        filterByContinentOptions={filterByContinentOptions}
        onSelect={filterEventHandler}
      />
      <main>
        <Container className='pt-4 pb-4'>
          <Row xs={1} md={2} className='justify-content-center g-4 gap-3'>
            {renderCards(cities)}
          </Row>
        </Container>

        <Modal show={show} fullscreen={true} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{city?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: '80vh', width: '100wh' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={position} icon={markerIcon}>
                <Popup>
                  {renderCardText(city, ['continent', 'population', 'landmarks'])}
                </Popup>
              </Marker>
            </MapContainer>
          </Modal.Body>
        </Modal>
      </main>
      <Footer />
    </>
  );
}

export default App;
