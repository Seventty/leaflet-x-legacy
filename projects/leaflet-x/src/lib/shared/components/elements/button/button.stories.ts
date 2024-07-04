import { Meta, Story } from '@storybook/angular'
import { ButtonComponent } from './button.component'

export default {
    title: 'Button',
    component: ButtonComponent,
    argTypes: {
        Color: {
            options: ['primary', 'danger'],
            control: { type: 'select' }
        },
        Size: {
            options: ['sm', 'md', 'lg'],
            control: { type: 'select' }
        }
    }
} as Meta


const templateText = `<UIButton
[color]="baseColor"
[outline]="outline"
[disabled]="disabled"
[size]="size"
>
{{label}}
</UIButton>
`

const Template: Story<ButtonComponent> = (args: ButtonComponent, {argTypes}) => ({
    template: templateText,
    props: Object.keys(argTypes),
    component: {ButtonComponent}
})

export const primary = Template.bind({})
primary.args = {
    baseColor: 'primary',
    disabled: false,
    outline: false,
    label: 'primary',
    size: 'lg'
}
