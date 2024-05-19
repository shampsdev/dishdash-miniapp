import Layout from '@/components/layout';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const LobbySettingsPage = () => {
  const [inputValue, setInputValue] = useState(1000);

  const updateRange = (value: number): void => {
    setInputValue(value);
  };

  return (
    <Layout>
      <div className="w-[360px] m-auto">
        <h3 className="text-2xl m-4 ml-0 font-bold">Настройки</h3>
        <div className="flex flex-col items-stretch [&>*]:rounded-3xl [&>*]:justify-start [&>*]:m-1">
          <Toggle>Кофейни</Toggle>
          <Toggle>Бары</Toggle>
          <Toggle>Пекарни</Toggle>
          <Toggle>Пицца</Toggle>
          <Toggle>Суши</Toggle>
          <Toggle>Кондитерская</Toggle>
        </div>
        <div className="content-between">
          <div className="flex justify-between mt-4">
            <p>Средняя цена</p>
            <label htmlFor="price">{inputValue} ₽</label>
          </div>
          <Label htmlFor="price"></Label>
          <Slider
            className="mt-3"
            defaultValue={[1000]}
            onValueChange={(value) => setInputValue(value)}
            max={10000}
            min={0}
            step={500}
            id="price"
          />
          <div className="flex w-[360px] justify-between mt-3">
            <p>0 ₽</p>
            <p>10 000 ₽</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button className="rounded-3xl">Получить ссылку приглашение</Button>
        </div>
      </div>
    </Layout>
  );
};

export default LobbySettingsPage;
