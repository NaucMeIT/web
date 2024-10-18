# design-system

## Compound Components

Most components in this library are compound components. Often, we want to extend the functionality of each part of the compound component, which can lead to passing numerous props, making the code harder to maintain.

One alternative is passing an object with props for each part, but this requires wrapping each object in the [useMemo](https://react.dev/reference/react/useMemo) hook to prevent unnecessary re-renders.

This is where **Mixins** come in. They provide a simple abstraction to manage props without overwhelming the component.

### How to Use Mixins

- The `MixinProps` generic accepts two parameters: a `prefix` and the `actual type`.
- Use the `splitProps` utility to extract the mixins and pass them to the respective component.
- By default, the root component’s props are retrieved using the `rest` prefix.

Here’s an example:

```typescript
interface TextWithContainerProps extends MixinProps<'span', HTMLSpanElement>, HTMLDivElement {}

const TextWithContainer = (mixProps: TextWithContainerProps) => {
  const { rest, span } = splitProps(mixProps, 'span')

  return (
    <div {...rest}>
      <span {...span}>Hello World!</span>
    </div>
  )
}
```

To use it:

```typescript
<TextWithContainer spanClassName='text-red-500' className='bg-green-500' />
```
